import { PHPBBNotification, NotificationsService } from './../../../../services/notifications.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-a-notification-row',
  templateUrl: './a-notification-row.component.html',
  styleUrls: ['./a-notification-row.component.scss']
})
export class ANotificationRowComponent implements OnInit {

  @Input()
  public notif: PHPBBNotification;

  public users: { name: string, color: string }[] = [];
  public notifType: string;
  public endText: string;
  public reference: string;
  public img: string;

  constructor(private notifAPI: NotificationsService) { }

  ngOnInit() {
    this.computeInfoFromNotif();
  }

  /**
   * Marks the current notif as seen
   */
  public markAsSeen(event: Event) {
    event.stopPropagation();
    this.notifAPI.markAsRead(this.notif);
  }

  private computeInfoFromNotif() {
    let str = this.extractType();
    this.endText = this.extractUsers(str).replace(/by|par/, "");

    this.extractReference();
    this.extractImg();

  }

  private extractImg() {
    let regex = /data-src=["']\.\/(.*?)["']/;

    let m = regex.exec(this.notif.AVATAR);
    if (m) this.img = m[1];
  }

  private extractReference() {
    this.reference = this.notif.REFERENCE.replace(/^["'](.*?)["']$/, "$1");
  }

  private extractUsers(str: string): string {
    let regex = /(from |and )?<span( style=['"]color: #(.*?);["'])? class=['"]username(.*?)['"]>(.*?)<\/span>(,?)/

    let matchs = regex.exec(str);
    while (matchs != null) {
      this.users.push({ name: matchs[5], color: matchs[3] });
      str = str.replace(matchs[0], "");
      matchs = regex.exec(str);
    }

    return str;
  }

  private extractType() {
    let regex = /^<strong>(.*?)<\/strong>/;
    let match = regex.exec(this.notif.FORMATTED_TITLE);

    if (match[1]) this.notifType = match[1];

    return this.notif.FORMATTED_TITLE.replace(match[0], "");
  }

}

import { StateService } from '@uirouter/angular';
import { PhpbbApiService } from './../../../../../services/phpbb-api.service';
import { Component, OnInit, Input } from '@angular/core';
import { UrlService } from '@uirouter/core';

@Component({
  selector: 'scfr-header-notification-a-notif',
  templateUrl: './a-notif.component.html',
  styleUrls: ['./a-notif.component.scss']
})
export class ANotifComponent implements OnInit {

  @Input()
  public notif: IPHPBBNotif;
  public avatar: string;

  constructor(protected phpbbApi: PhpbbApiService, protected url: UrlService) { }

  ngOnInit() {
    this.getAvatar()
  }

  public getAvatar() {
    const regex = new RegExp(/ data-src=['"]([^'"]*)/);

    let m = regex.exec(this.notif.AVATAR);
    if (m && m[1]) this.avatar = m[1];
  }

  public goTo(event: Event) {
    this.markAsRead();

    this.url.url(this.notif.URL, true);

    event.preventDefault();
    event.stopPropagation();
  }

  public markAsRead() {

    this.phpbbApi.getPhpbbAjaxPage(this.notif.U_MARK_READ).subscribe((data) => {

    });

  }

}


export interface IPHPBBNotif {
  AVATAR: string;
  FORMATTED_TITLE: string;
  FORUM: string;
  NOTIFICATION_ID: string;
  REASON: string;
  REFERENCE: string;
  STYLING: string;
  S_BLOCK_NAME: "notifications";
  S_FIRST_ROW: boolean;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
  TIME: string;
  UNREAD: boolean;
  URL: string;
  U_MARK_READ: string;
}
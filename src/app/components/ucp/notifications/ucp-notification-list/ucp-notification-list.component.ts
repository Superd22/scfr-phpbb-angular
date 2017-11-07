import { UrlService } from '@uirouter/core';
import { NotificationsService } from './../../../../services/notifications.service';
import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-notification-list',
  templateUrl: './ucp-notification-list.component.html',
  styleUrls: ['./ucp-notification-list.component.scss']
})
export class UcpNotificationListComponent extends UcpSubPageFormComponent implements OnInit {

  constructor(protected notifs: NotificationsService, protected url: UrlService) {
    super();
  }

  ngOnInit() {
    this.getAvatars()
  }

  /**
   * Fetch page n of notifications
   * @param n the page to fetch 
   */
  public fetchPage(n: number) {
    if (n < 1) return;

    const start = (n - 1) * 20;

    this.state.go(this.state.current, Object.assign(this.state.params, { start: start, phpbbResolved: false }));
  }

  /**
   * @todo 
   */
  public markAllRead() {
    this.notifs.markAllRead();
  }


  public getAvatars() {
    if (this.ucp && this.ucp.tpl.notification_list)
      for (let notif of this.ucp.tpl.notification_list) {
        const regex = new RegExp(/ data-src=['"]([^'"]*)/);

        let m = regex.exec(notif.AVATAR);
        if (m && m[1]) notif.avatar = m[1];
      }
  }

  public goTo(event: Event, notif) {
    this.markAsRead(notif);

    this.url.url(notif.URL, true);

    event.preventDefault();
    event.stopPropagation();
  }

  public markAsRead(notif) {
    this.api.getPhpbbAjaxPage(notif.U_MARK_READ).subscribe((data) => {

    });

  }
}

import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-notification-list',
  templateUrl: './ucp-notification-list.component.html',
  styleUrls: ['./ucp-notification-list.component.scss']
})
export class UcpNotificationListComponent extends UcpSubPageFormComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
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
}

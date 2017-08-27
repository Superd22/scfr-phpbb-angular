import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-notification-options',
  templateUrl: './ucp-notification-options.component.html',
  styleUrls: ['./ucp-notification-options.component.scss']
})
export class UcpNotificationOptionsComponent extends UcpSubPageFormComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}

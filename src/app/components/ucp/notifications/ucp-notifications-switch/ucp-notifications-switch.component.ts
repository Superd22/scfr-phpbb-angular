import { UcpSwitchMainComponent } from 'app/components/ucp/ucp-switch-main/ucp-switch-main.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-notifications-switch',
  templateUrl: './ucp-notifications-switch.component.html',
  styleUrls: ['./ucp-notifications-switch.component.scss']
})
export class UcpNotificationsSwitchComponent  extends UcpSwitchMainComponent  {

  ngOnInit() {
    this.handleMode("notification_list");
  }

}

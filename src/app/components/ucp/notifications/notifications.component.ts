import { UcpComponent } from './../ucp.component';
import { Component, OnInit, Host } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class UcpMainNotificationsComponent implements OnInit {

  constructor( @Host() public ucp: UcpComponent) { }

  ngOnInit() {
  }

}

import { IPHPBBNotif } from './../a-notif/a-notif.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-header-notification-pannel',
  templateUrl: './notification-pannel.component.html',
  styleUrls: ['./notification-pannel.component.scss']
})
export class NotificationPannelComponent implements OnInit {

  @Input("notifs")
  public notifs: IPHPBBNotif[];



  constructor() { }

  ngOnInit() {
  }

}

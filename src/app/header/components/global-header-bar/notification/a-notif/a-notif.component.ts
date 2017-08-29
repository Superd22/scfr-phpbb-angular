import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-header-notification-a-notif',
  templateUrl: './a-notif.component.html',
  styleUrls: ['./a-notif.component.scss']
})
export class ANotifComponent implements OnInit {

  @Input()
  public notif: IPHPBBNotif;

  constructor() { }

  ngOnInit() {
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
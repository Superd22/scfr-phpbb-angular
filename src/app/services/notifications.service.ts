import { PhpbbApiService } from './phpbb-api.service';
import { StateTranslate } from './state-translate.service';
import { Injectable } from '@angular/core';
import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';

@Injectable()
export class NotificationsService {

  /** number of unread notifications */
  private _unreadNotifCount: number = 0;
  private _latestNotifs: PHPBBNotification[];
  private _markAllLink: string;

  constructor(private stateT: StateTranslate, private api: PhpbbApiService) {
    stateT.latestTemplateData.subscribe((tpl) => this.currentTemplate = tpl);
  }

  public set currentTemplate(tpl: any) {
    this._unreadNotifCount = Number(tpl.UNREAD_NOTIFICATIONS_COUNT);
    this._latestNotifs = tpl.notifications;
    this._markAllLink = new UnicodeToUtf8Pipe().transform(tpl.U_MARK_ALL_NOTIFICATIONS);
  }


  /**
   * Mark a single notification as read
   */
  public markAsRead(notif: PHPBBNotification) {
    this.api.getPage(notif.U_MARK_READ, null, null, true).subscribe((data: any) => {
      let p: { "success": boolean } = data;

      if (p.success) {
        this._unreadNotifCount -= 1;
        notif.UNREAD = false;
      }
    });
  }

  public markAllRead() {
    this.api.getPage(this._markAllLink, null, null, true).subscribe((data: any) => {
      let p: { MESSAGE_TITLE: string, MESSAGE_TEXT: string, success: boolean } = data;

      if(p.success) {
        this._unreadNotifCount = 0;
        this._latestNotifs.forEach( notif => notif.UNREAD = false);
        this.api.openSnackBar(p.MESSAGE_TEXT);
      }
      else this.api.errorSnackBar(p.MESSAGE_TEXT);


    });
  }

  /** 
   * Returns the 10 latest notifications, at no extra http cost
   * @return [PHPBBNotification[]]
   */
  public get latestNotifs(): PHPBBNotification[] {
    return this._latestNotifs;
  }

  public get unreadNotifCount(): number {
    return this._unreadNotifCount;
  }


}


export interface PHPBBNotification {
  AVATAR: string
  FORMATTED_TITLE: string
  FORUM: string
  NOTIFICATION_ID: string
  REASON: string
  REFERENCE: string
  STYLING: string
  /** notification type (defaults: notifications) */
  S_BLOCK_NAME: string
  S_ROW_COUNT: number
  S_ROW_NUM: number
  /** time of the notification */
  TIME: string
  /** if we're unread or seen */
  UNREAD: boolean
  /** target url of the notification */
  URL: string
  /** Legacy URL to marks this as read */
  U_MARK_READ: string
}
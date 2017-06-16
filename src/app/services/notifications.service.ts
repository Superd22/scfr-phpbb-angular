import { StateTranslate } from './state-translate.service';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationsService {

  private _unreadNotifCount: number = 0;
  private _notifications;

  constructor(private stateT: StateTranslate) {
    stateT.latestTemplateData.subscribe((tpl) => this.currentTemplate = tpl);
  }

  public set currentTemplate(tpl: any) {
    this._unreadNotifCount = Number(tpl.UNREAD_NOTIFICATIONS_COUNT);
  }



}

import { environment } from './../../../environments/environment';
import { IPHPBBNotif } from './../components/global-header-bar/notification/a-notif/a-notif.component';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IMainHeaderBarWP } from './../interfaces/main-header-bar-wp.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalHeaderService {

  private _headerDataCache: ReplaySubject<IMainHeaderBarWP> = null;
  public notificationCount: number = 0;
  public pmCount: number = 0;
  public loggedIn: boolean = false;
  public markNotificationRead: string = "";
  public isJuliet: boolean = false;

  public notifications: IPHPBBNotif[] = [];

  constructor(private http: Http) { }

  /** 
   * Fetch the header data from the back-end
   * @param force force update even if we have a cached value.
   */
  public getHeaderData(force?: boolean): ReplaySubject<IMainHeaderBarWP> {
    let fetch = false;
    if (!this._headerDataCache) {
      fetch = true
      this._headerDataCache = new ReplaySubject(1);
    }

    if (force) fetch = true;

    if (fetch) {
      this.http.get(environment.baseForumUrl + "../wp-json/HeaderBar/Full/").subscribe((res) => {
        this._headerDataCache.next(res.json());
      });
    }

    return this._headerDataCache;
  }

  /**
   * Get a forum tpl object by the component, and fetches it if undefined.
   * 
   * @param tpl 
   */
  public setForumTpl(tpl: any) {
    if (!tpl) {
      this.fetchForumData();
    }
    else this.setForumData(tpl);
  }

  /**
   * Fetches data from the forum
   */
  public fetchForumData() {
    this.http.get(environment.baseForumUrl + "?scfr_json_callback=true", { withCredentials: true }).subscribe((res) => {
      let tpl = res.json()['@template'];
      this.setForumData(tpl);
    });
  }

  /**
   * Takes a forum tpl and sets all the value we use.
   * 
   * @param tpl the forum tpl object. 
   */
  private setForumData(tpl) {
    this.loggedIn = (Number(tpl['CURRENT_USER_ID']) > 1);
    this.notificationCount = Number(tpl["UNREAD_NOTIFICATIONS_COUNT"]);
    this.pmCount = Number(tpl['S_USER_NEW_PRIVMSG']);
    this.notifications = tpl['notifications'];
    this.markNotificationRead = tpl['U_MARK_ALL_NOTIFICATIONS'];
  }
}

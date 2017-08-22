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
      this.http.get("https://starcitizen.fr/wp-json/HeaderBar/Full/").subscribe((res) => {
        this._headerDataCache.next(res.json());
      });
    }

    return this._headerDataCache;
  }

  public fetchForumData() {
    this.http.get("http://www.newforum.fr/?scfr_json_callback=true", { withCredentials: true }).subscribe((res) => {
      let tpl = res.json()['@template'];

      this.loggedIn = (Number(tpl['CURRENT_USER_ID']) > 1);
      this.notificationCount = Number(tpl["UNREAD_NOTIFICATIONS_COUNT"]);
      this.pmCount = Number(tpl['S_USER_NEW_PRIVMSG']);
    });
  }

}

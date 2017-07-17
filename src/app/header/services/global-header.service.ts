import { ReplaySubject } from 'rxjs/ReplaySubject';
import { IMainHeaderBarWP } from './../interfaces/main-header-bar-wp.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GlobalHeaderService {

  private _headerDataCache: ReplaySubject<IMainHeaderBarWP> = null;

  constructor(private http: Http) { }

  /** 
   * Fetch the header data from the back-end
   * @param force force update even if we have a cached value.
   */
  public getHeaderData(force?: boolean): ReplaySubject<IMainHeaderBarWP> {
    let fetch = false;
    if(!this._headerDataCache) {
      fetch = true
      this._headerDataCache = new ReplaySubject(1);
    }

    if(force) fetch = true;

    if(fetch) {
      this.http.get("https://starcitizen.fr/wp-json/HeaderBar/Full/").subscribe( (res) => {
         this._headerDataCache.next(res.json());
      });
    }

    return this._headerDataCache;
  }

}

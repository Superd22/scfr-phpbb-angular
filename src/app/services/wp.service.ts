import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { IWPANews } from './../components/index/interfaces/wp-news.interface';
import { environment } from 'environments/environment';
import { IWPNews } from './../interfaces/wp/wp-news.interface';
import { IGuideDesNouveauxResponse } from './../components/index/interfaces/guide-des-nouveaux.interface';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs/Rx";
import { Observable } from "rxjs/Observable";

/**
 * Main service for accessing WordPress based data for sc.fr
 */
@Injectable()
export class WpService {

  private _scfr = "https://starcitizen.fr/";
  private _guide: BehaviorSubject<IGuideDesNouveauxResponse> = new BehaviorSubject(null);
  private _news: BehaviorSubject<IWPANews[]> = new BehaviorSubject([]);

  constructor(private http: Http) { }

  /**
   * Main getter for the wordpress
   */
  public get(url: string, args = {}) {
    return this.http.get(url, { params: args }).map((res) => { return res.json(); });
  }

  /**
   * Get a basic wordpress page with ?callback=json
   * @param page the url for the page
   */
  public getPageCallback(page: string, args = {}) {
    return this.get(this._scfr + page, Object.assign(args, { callback: 'json' }));
  }

  public getWpAPI(endpoint: string, args = {}) {
    return this.get(this._scfr + "wp-json/" + endpoint, args);
  }

  public getGuideDesNouveaux(force?: boolean): Observable<IGuideDesNouveauxResponse> {
    if (force || !this._guide.getValue()) {
      return this.getPageCallback("star-citizen/guide-des-nouveaux/").map((data) => { this._guide.next(data); return data });
    }

    return this._guide;
  }

  public getNews(force?: boolean): Observable<IWPANews[]> {
    if (force || !this._news.getValue().length) {
      return this.getWpAPI("wp/v2/posts").map(data => { this._news.next(UnicodeToUtf8Pipe.forEach(data)); return data });
    }

    return this._news;
  }

  public getNewsById(id: number): Observable<IWPNews> {
    return this.getPageCallback("", { p: id });
  }
}

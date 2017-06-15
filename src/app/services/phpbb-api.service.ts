import { ViewforumComponent } from './../components/viewforum/viewforum.component';
import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { PhpbbAjaxMessageResponse } from './../interfaces/phpbb/phpbb-ajax-message-response';
import { MdSnackBar } from '@angular/material';
import { PhpbbFormHelperService } from './phpbb-form-helper.service';
import { StateTranslate } from './state-translate.service';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { PhpbbTemplateResponse } from '../models/phpbb-template-response'
import { IndexResponse } from '../models/IndexResponse';
import { UnreadResponse } from '../models/Search/UnreadReponse';
import { UcpResponse } from '../models/UcpResponse';

import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";

const baseUrl = 'http://www.newforum.fr/';
const callback = 'scfr_json_callback=true';

@Injectable()
export class PhpbbApiService {
    private sid: string | null;
    private stranslate: StateTranslate;
    public set translate(t: StateTranslate) {
        this.stranslate = t;
    }
    constructor(private http: Http, private snackBar: MdSnackBar) { }

    public buildParameters(arrayOfParam?: {}, raw?: boolean, noSID?: boolean): string {
        let urlParam = new URLSearchParams();
        for (let paramKey in arrayOfParam) {
            if (arrayOfParam.hasOwnProperty(paramKey)) {
                urlParam.append(paramKey, arrayOfParam[paramKey]);
            }
        }
        if (typeof raw == "undefined" || raw === false) urlParam.append('scfr_json_callback', 'true');
        if (this.sid && !noSID) urlParam.append('sid', this.sid);
        return urlParam.toString();
    }

    public registerSid(sid) {
        this.sid = sid;
    }

    /**
     * Convenience function to send a POST payload to a forum page
     * @param page the target page
     * @param query the POST data
     * @param params the optionals get paramaters to append to the page url
     * @param raw if we want raw HTML return instead of JSON return.
     */
    public postPage(page, query, params?: any, raw?: boolean): Observable<PhpbbTemplateResponse.DefaultResponse> {
        /** No explicit content-type so the browser can auto-identify it and set the boundary.
         * @see https://stackoverflow.com/a/39281156
         */
        //let headers = new Headers({ 'Content-Type': 'multipart/form-data' });

        let options = new RequestOptions({ method: "post", withCredentials: true, params: this.buildParameters(params, raw) });
        let body = new FormData();

        Object.keys(query).forEach(key => {
            body.set(key, query[key]);
        });

        return this.http.post(`${baseUrl}${page}`, body, options)
            .map((res: Response) => {
                try {
                    let ret = res.json();
                    this.handleSID(ret);

                    return ret;
                } catch (error) {
                    // We don't have a JSON thingy, most likely we got redirected by PHPBB.
                    // We're gonna redirect ourselves there.
                    let regex = new RegExp(baseUrl + "(.*)");
                    let m = regex.exec(res.url);

                    if (m[1] && m[1].indexOf(".php") > -1) {
                        this.stranslate.goToOld(m[1]);
                    }
                    else throw "NO JSON CAN'T REDIRECT";
                }
            })

    }

    /**
     * Convenience function to send a GET paylood to a forum page
     * @param page the target page
     * @param queries the GET data
     * @param raw if we want raw HTML return instead of JSON return.
     */
    public getPage(page, queries?: {}, raw?: boolean, XLMHttpRequest?: boolean): Observable<PhpbbTemplateResponse.DefaultResponse> {
        let headers = null;
        if (XLMHttpRequest) headers = new Headers({ 'X-Requested-With': 'XMLHttpRequest' });

        return this.http.get(`${baseUrl}${page}`, { headers: headers, search: this.buildParameters(queries, raw), withCredentials: true })
            .map((res: Response) => {
                let ret = res.json();

                this.handleSID(ret);

                return ret;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getPhpbbAjaxPage(page, queries?: {}): Observable<PhpbbAjaxMessageResponse> {
        return this.getPage(page, queries, null, true)
            .map((data: any) => data)
            .catch((error: any) => {
                return Observable.of({
                    MESSAGE_TEXT: "Une erreur s'est produite",
                    MESSAGE_TITLE: "Erreur",
                    REFRESH_DATA: null,
                    S_USER_NOTICE: false,
                    S_USER_WARNING: true,
                    S_ERROR: true,
                });
            });
    }

    public getIndex(): Observable<IndexResponse.IndexRoot> {
        return this.getPage('index.php');
    }

    public getMessage() {
        return this.getPage('ucp.php', { i: 'pm', folder: 'inbox' });
    }

    public getForumById(forum: number, start?: number): Observable<PhpbbTemplateResponse.DefaultResponse> {
        let params: { f: number, start: number } = { f: forum, start: start };

        if (ViewforumComponent.hasLocalSortPref(forum))
            return this.postPage('viewforum.php', ViewforumComponent.localSortPref(forum), params);
        else return this.getPage('viewforum.php', params);
    }

    public getTopicById(topic: number, offset: number = 0): Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.getPage('viewtopic.php', { t: topic, start: offset });
    }

    public getPrivateMessageList(): Observable<PhpbbTemplateResponse.DefaultResponse> {
        let params = { i: 'pm', folder: 'inbox' };
        return this.getPage('ucp.php', params);
    }

    public getApi(page, params?) {
        return this.getPage(`SCFRAPI/${page}`, params, true);
    }

    /*
    SearchID: unreadposts,
     */
    public getSearch(searchId: string): Observable<PhpbbTemplateResponse.DefaultResponse> {
        let params = { search_id: searchId };
        return this.getPage('search.php', params);
    }

    // LOGIN
    public authenticate(username, password, sid, remember): Observable<IndexResponse.IndexRoot> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let redirect = `index.php?${callback}`;
        let params: any = {
            username: username,
            password: password,
            sid: sid,
            login: 'login',
            redirect: redirect,
            mode: 'login'
        };
        if (remember) params.autologin = true;
        return this.http.post(`${baseUrl}ucp.php`, this.buildParameters(params), { headers: headers, withCredentials: true })
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json().error || 'Server Error'));
    }

    // Performs logout of PhpBB anc calls getAuthentification afterwards
    // This is because we can't log out redirect to scfr_json_callback.
    public logout(): Observable<boolean> {
        return this.getPage('ucp.php', { mode: 'logout' }, true).map(
            () => true
        ).catch(() => Observable.throw(true));
    }

    public getAuthentication(): Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.getPage('').map(data => {
            this.stranslate.latestTemplateData.next(data['@template']);
            return data;
        });
    }

    private handleSID(tpl) {
        if (tpl && tpl['@template'] && tpl['@template']['SESSION_ID'] != this.sid) this.registerSid(tpl['@template']['SESSION_ID']);
    }

    /**
     * Convenience function to open a snackbar 
     * @param message the message to display
     * @param trustAsHtml trust the message as a safe html 
     */
    public openSnackBar(message: string, trustAsHtml?: boolean) {
        this.snackBar.open(message, "Information", {
            duration: 5000,
        });
    }

    public errorSnackBar(message: string) {
        this.snackBar.open(message, "Erreur", {
            duration: 5000,
            extraClasses: ["warn"],
        });
    }
}

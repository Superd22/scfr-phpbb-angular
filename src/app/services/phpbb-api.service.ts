import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { PhpbbTemplateResponse } from '../models/phpbb-template-response'
import { IndexResponse } from '../models/IndexResponse';
import { UnreadResponse } from '../models/Search/UnreadReponse';
import { UcpResponse } from '../models/UcpResponse';

import { Http, Response, Headers, URLSearchParams } from '@angular/http';

const baseUrl = 'http://forum.pixelone.fr/';
const callback = 'scfr_json_callback=true';

@Injectable()
export class PhpbbApiService {
    private sid: string|null;
    constructor(private http: Http){}

    public buildParameters(arrayOfParam?: {}): string{
        let urlParam = new URLSearchParams();
        for(let paramKey in arrayOfParam){
            if (arrayOfParam.hasOwnProperty(paramKey)) {
                urlParam.append(paramKey, arrayOfParam[paramKey]);
            }
        }
        urlParam.append('scfr_json_callback', 'true');
        urlParam.append('sid', this.sid);
        return urlParam.toString();
    }

    public registerSid(sid){
        this.sid = sid;
    }

    public getPage(page, queries?: {}):Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.http.get(`${baseUrl}${page}`, {search: this.buildParameters(queries)} )
        .map((res:Response) => res.json())
        .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getIndex():Observable<IndexResponse.IndexRoot>{
        return this.getPage('index.php');
    }

    public getMessage(){
        return this.getPage('ucp.php', {i: 'pm', folder: 'inbox'});
    }

    public getForumById(forum: number):Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.getPage('viewforum.php', {f: forum});
    }

    public getTopicById(topic: number, offset: number = 0):Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.getPage('viewtopic.php', {t: topic, start: offset});
    }

    public getPrivateMessageList():Observable<PhpbbTemplateResponse.DefaultResponse>{
        let params = {i: 'pm', folder: 'inbox'};
        return this.getPage('ucp.php', params);
    }

    /*
    SearchID: unreadposts,
     */
    public getSearch(searchId: string):Observable<PhpbbTemplateResponse.DefaultResponse>{
        let params = {search_id: searchId} ;
        return this.getPage('search.php', params);
    }

    // LOGIN
    public authenticate(username, password, sid, remember): Observable<IndexResponse.IndexRoot>{
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
        if(remember) params.autologin = 'true';
        return this.http.post(`${baseUrl}ucp.php`, this.buildParameters(params), {headers: headers})
            .map((res:Response) => res.json()['@template'])
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getAuthentication(): Observable<PhpbbTemplateResponse.DefaultResponse>{
        return this.getPage('');
    }
}

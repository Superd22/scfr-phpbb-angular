import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { PhpbbTemplateResponse } from '../model/phpbb-template-response'
import { IndexResponse } from '../model/IndexResponse';
import { UnreadResponse } from '../model/Search/UnreadReponse';
import { UcpResponse } from '../model/UcpResponse';

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

    public getTopicById(topic: number):Observable<PhpbbTemplateResponse.DefaultResponse> {
        return this.getPage('viewtopic.php', {t: topic});
    }

    public getPrivateMessageList():Observable<UcpResponse.Messagerow[]>{
        let params = {i: 'pm', folder: 'inbox'};
        return this.http.get(`${baseUrl}ucp.php`, {search: this.buildParameters(params)} )
            .map((res:Response) => res.json()['@template'].messagerow)
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getUnreadTopicList():Observable<UnreadResponse.Searchresult[]>{
        let params = {search_id: 'unreadposts'} ;
        return this.http.get(`${baseUrl}search.php`, {search: this.buildParameters(params)})
            .map((res:Response) => res.json()['@template'].searchresults)
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
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

    public getAuthentication(): Observable<IndexResponse.Template>{
        return this.http.get(`${baseUrl}`, {search: this.buildParameters()})
            .map((res:Response) => res.json()['@template'])
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }
}

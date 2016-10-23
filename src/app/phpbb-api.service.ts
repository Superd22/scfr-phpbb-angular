import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { IndexResponse } from "./Model/IndexResponse";
import { UnreadResponse } from './Model/Search/UnreadReponse';

const baseUrl = 'http://forum.pixelone.fr/';
const callback = 'scfr_json_callback=true';

@Injectable()
export class PhpbbApiService {
    constructor(private http: Http){

    }

    public getIndex():Observable<IndexResponse.IndexRoot>{
        return this.http.get(`${baseUrl}?${callback}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getMessage(){
        return this.http.get(`${baseUrl}ucp.php?i=pm&folder=inbox&${callback}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getUnreadTopic():Observable<UnreadResponse.Template>{
        return this.http.get(`${baseUrl}search.php?search_id=unreadposts&${callback}`)
            .map((res:Response) => res.json()['@template'])
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }


    //LOGIN
    public authenticate(username, password, sid): Observable<IndexResponse.Template>{
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);
        params.append('sid', sid);
        params.append('login', 'Login');
        //params.append('redirect', './ucp.php?mode=login');
        params.append('redirect', `index.php?${callback}`);
        params.append('mode','login');
        console.log(params.toString());
        return this.http.post(`${baseUrl}ucp.php`, params.toString(), {headers: headers})
            .map((res:Response) => res.json()['@template'])
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getAuthentication(): Observable<IndexResponse.Template>{
        return this.http.get(`${baseUrl}?${callback}`)
            .map((res:Response) => res.json()['@template'])
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }
}

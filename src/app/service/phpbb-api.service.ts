import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { PhpbbTemplateResponse } from '../model/phpbb-template-response'
import { IndexResponse } from "../model/IndexResponse";
import { UnreadResponse } from '../model/Search/UnreadReponse';

const baseUrl = 'http://forum.pixelone.fr/';
const callback = 'scfr_json_callback=true';

@Injectable()
export class PhpbbApiService {
    constructor(private http: Http){

    }

    public getPage(page, queries = []):Observable<PhpbbTemplateResponse.DefaultResponse> {
        let params: URLSearchParams = new URLSearchParams();
        params.set("scfr_json_callback", "true");

        if(queries && queries.length > 0) 
            queries.forEach(
                (query) => {
                    if(typeof query.value !== "undefined" && typeof query.query !== "undefined") 
                        params.set(query.query, query.value)
                }
            );

        return this.http.get(`${baseUrl}${page}${callback}`, {search: params})
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

    public getIndex():Observable<IndexResponse.IndexRoot>{
        return this.getPage("index.php");
    }

    public getMessage(){
        return this.getPage("ucp.php", [
            {query: 'i', value: 'pm'},
            {query: 'folder', value: 'inbox'},
        ]);
    }

    // TO DO : switch to this.getPage (need to fix response type)
    public getUnreadTopic():Observable<UnreadResponse.Template>{
        // return this.getPage("search.php", [
        //    {query: 'search_id', value: 'unreadposts'}
        //    ]);
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

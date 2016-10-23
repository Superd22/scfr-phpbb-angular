import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Rx";
import { IndexResponse } from "./Model/IndexResponse";

const baseUrl = 'http://forum.pixelone.fr/';
const callback = '?scfr_json_callback=true';

@Injectable()
export class PhpbbApiService {
    constructor(private http: Http){ }

    public getIndex():Observable<IndexResponse.IndexRoot>{
        return this.http.get(`${baseUrl}${callback}`)
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server Error'));
    }

}

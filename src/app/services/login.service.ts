import { Injectable } from '@angular/core';
import { PhpbbApiService } from './phpbb-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class LoginService {
    public loggedIn:boolean;
    public sid: string|null;
    public username: string;
    public avatar: string;
    public legend: string;
    public rememberMe: boolean;

    private _observeLogin = new BehaviorSubject<boolean>(false);
    public observeLogin = this._observeLogin.asObservable();

    constructor(public phpbbApi: PhpbbApiService, public mdToast: MdSnackBar) {
        this.authenticationCheck();
    }

    // This will need to be trigger by a component
    public loginUser(username: string, password: string, sid: string, rememberMe){
        this.phpbbApi.authenticate(username, password, sid, rememberMe).subscribe(
            data => this.hydrateUserData(data),
            err => console.log(err)
        );
    }

    private authenticationCheck(){
        this.phpbbApi.getAuthentication().subscribe(
            data => this.hydrateUserData(data),
            err => console.log(err)
        );
    }

    private hydrateUserData(data){
        if(data.S_USER_LOGGED_IN){
            this.phpbbApi.registerSid(data._SID);
            this._observeLogin.next(data.S_USER_LOGGED_IN);
            this.loggedIn = data.S_USER_LOGGED_IN;
            this.avatar = / src="([^"]*)"/.exec(data.CURRENT_USER_AVATAR)[1];
            this.username = data.S_USERNAME;
            this.legend = data.LEGEND.split(',')[0];
        } else {
            console.log(data.LOGIN_ERROR);
            //this.mdToast.open(data.LOGIN_ERROR, null, new MdSnackBarConfig());
            this._observeLogin.next(false);
            this.loggedIn = false;
        }
    }
}

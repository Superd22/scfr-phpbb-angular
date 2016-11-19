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

    public userStatus = new BehaviorSubject<{status:boolean, message?:string}>({status:false});

    constructor(public phpbbApi: PhpbbApiService, public mdToast: MdSnackBar) {
        this.authenticationCheck();
    }

    // This will need to be trigger by a component
    public loginUser(username: string, password: string, rememberMe){
        this.phpbbApi.authenticate(username, password, this.sid, rememberMe).subscribe(
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
            this.userStatus.next({status: data.S_USER_LOGGED_IN});
            this.loggedIn = data.S_USER_LOGGED_IN;
            this.avatar = / src="([^"]*)"/.exec(data.CURRENT_USER_AVATAR)[1];
            this.username = data.S_USERNAME;
            this.legend = data.LEGEND.split(',')[0];
        } else {
            this.userStatus.next({status:false, message:data.LOGIN_ERROR});
            this.loggedIn = false;
        }
    }
}

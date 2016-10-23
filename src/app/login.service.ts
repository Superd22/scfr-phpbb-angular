import { Injectable } from '@angular/core';
import { PhpbbApiService } from './phpbb-api.service';

@Injectable()
export class LoginService {
    public loggedIn: boolean|null;
    public sid: string|null;
    public username: string;
    public avatar: string;
    public legend: string;

    constructor(public phpbbApi: PhpbbApiService) {
        this.authenticationCheck();
    }

    public loginUser(username:string, password:string, sid: string){
        this.phpbbApi.authenticate(username, password, sid).subscribe(
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
            this.loggedIn = data.S_USER_LOGGED_IN;
            this.avatar = / src="([^"]*)"/.exec(data.CURRENT_USER_AVATAR)[1];
            this.username = data.S_USERNAME;
            this.legend = data.LEGEND.split(',')[0];
        } else {
            this.loggedIn = false;
        }
    }
}

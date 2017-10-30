import { ServiceLocator } from './ServiceLocator';
import { StateTranslate } from './state-translate.service';
import { Transition } from '@uirouter/angular';
import { Injectable } from '@angular/core';
import { PhpbbApiService } from './phpbb-api.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Injectable()
export class LoginService {
    public loggedIn: boolean;
    public sid: string | null;
    public username: string;
    public avatar: string;
    public legend: string;
    public rememberMe: boolean;
    public phpbbApi: PhpbbApiService;
    public userStatus = new BehaviorSubject<{ status: boolean, message?: string }>({ status: false });

    constructor(public mdToast: MdSnackBar) {
        this.phpbbApi = ServiceLocator.injector.get(PhpbbApiService);
        this.authenticationCheck();
    }

    // This will need to be trigger by a component
    public loginUser(username: string, password: string, rememberMe) {
        this.phpbbApi.authenticate(username, password, this.sid, rememberMe).subscribe(
            data => this.hydrateUserData(data["@template"]),
            err => console.log(err)
        );
    }

    public logoutUser() {
        if (!this.loggedIn) return false;
        this.phpbbApi.logout().subscribe(
            () => this.authenticationCheck(),
            () => this.authenticationCheck()
        );
    }

    private authenticationCheck() {
        this.phpbbApi.getAuthentication().subscribe(
            data => {
                this.hydrateUserData(data["@template"])
            },
            err => console.log(err)
        );


    }

    // Hydrate user with the relevant data.
    // userStatus should be updated *LAST* so that every relevant data is accessible
    // When its subscribtions are triggered.
    private hydrateUserData(data) {
        if (data.S_USER_LOGGED_IN) {
            this.phpbbApi.registerSid(data.SESSION_ID);
            this.loggedIn = data.S_USER_LOGGED_IN;
            let m = / src="([^"]*)"/.exec(data.CURRENT_USER_AVATAR)
            this.avatar = m && m[1] ? m[1] : "";
            this.username = data.S_USERNAME;
            /** @todo THIS IS NOT THE USER'S GROUP */
            this.legend = data.LEGEND.split(',')[0];
            this.userStatus.next({ status: data.S_USER_LOGGED_IN });
        } else {
            this.loggedIn = false;
            this.userStatus.next({ status: false, message: data.LOGIN_ERROR });
        }
    }
}

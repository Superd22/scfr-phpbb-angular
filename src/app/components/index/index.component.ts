import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { PhpbbService } from '../../services/phpbb.service';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public unreadTopicList;
    public privateMessages;
    public isLoggedIn;

    constructor(public phpbb: PhpbbService, public LoginService: LoginService) { }

    ngOnInit() {
        this.LoginService.userStatus.subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
                if (isLoggedIn) {
                    this.getUnreadTopicList();
                    this.getPrivateMessageList();
                }
            }
        );
    }

    ngOnDestroy() {
    }

    public getUnreadTopicList() {
        this.phpbb.getUnreadTopicList().subscribe(
            data => this.unreadTopicList = data ? data.slice(0, 5) : null,
            err => console.log(err)
        );
    }

    public getPrivateMessageList() {
        this.phpbb.getPrivateMessageList().subscribe(
            data => this.privateMessages = data ? data.slice(0, 5) : null,
            err => console.log(err)
        );
    }
}

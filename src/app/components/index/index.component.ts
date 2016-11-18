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
        this.isLoggedIn = this.LoginService.observeLogin.subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
                if(isLoggedIn){
                    this.getUnreadTopicList();
                    this.getPrivateMessageList();
                }
            }
        );
    }

    ngOnDestroy() {
        this.isLoggedIn.unsubscribe();
    }

    public getUnreadTopicList(){
        this.phpbb.getUnreadTopicList().subscribe(
            data => this.unreadTopicList = data.slice(0,5),
            err => console.log(err)
        );
    }

    public getPrivateMessageList(){
        this.phpbb.getPrivateMessageList().subscribe(
            data => this.privateMessages = data.slice(0,5),
            err => console.log(err)
        );
    }
}

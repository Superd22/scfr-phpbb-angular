import { Component, OnInit } from '@angular/core';
import { PhpbbApiService } from '../../services/phpbb-api.service';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(public phpbbApi: PhpbbApiService, public LoginService: LoginService) { }
    public unreadTopicList;
    public privateMessages;
    public isLoggedIn;

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
        this.phpbbApi.getUnreadTopicList().subscribe(
            data => this.unreadTopicList = data.slice(0,5),
            err => console.log(err)
        );
    }

    public getPrivateMessageList(){
        this.phpbbApi.getPrivateMessageList().subscribe(
            data => this.privateMessages = data.slice(0,5),
            err => console.log(err)
        )
    }
}

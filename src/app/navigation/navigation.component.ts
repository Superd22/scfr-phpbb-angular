import { Component, OnInit } from '@angular/core';
import { IndexResponse } from '../Model/IndexResponse';

import { PhpbbApiService } from '../phpbb-api.service';
import { LoginService } from '../login.service';


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    constructor(private phpbbApi: PhpbbApiService, public LoginService: LoginService) { }

    public forumList: IndexResponse.Forumrow[];

    ngOnInit() {
        this.fetchForumList()
    }

    public fetchForumList():void{
        this.phpbbApi.getIndex().subscribe(
            data => {
                this.forumList = data['@template'].forumrow;
                this.LoginService.sid = data['@template']._SID;
            },
            err => console.log(err)
        );
    }

}

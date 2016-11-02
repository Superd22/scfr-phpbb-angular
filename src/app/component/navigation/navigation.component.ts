import { UnicodeToUtf8Pipe } from './../../pipe/unicode-to-utf8.pipe';
import { Component, OnInit } from '@angular/core';
import { IndexResponse } from '../../model/IndexResponse';

import { PhpbbApiService } from '../../service/phpbb-api.service';
import { LoginService } from '../../service/login.service';


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
                this.forumList = UnicodeToUtf8Pipe.forEach(data['@template'].forumrow);
                this.LoginService.sid = data['@template']._SID;
            },
            err => console.log(err)
        );
    }

}

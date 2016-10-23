import { Component, OnInit } from '@angular/core';
import { PhpbbApiService } from '../phpbb-api.service';
import { IndexResponse } from '../Model/IndexResponse';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.sass']
})

export class NavigationComponent implements OnInit {
    constructor(private phpbbApi: PhpbbApiService) { }

    public forumList: IndexResponse.Forumrow[];

    ngOnInit() {
        this.fetchForumList()
    }

    public fetchForumList():void{
        this.phpbbApi.getIndex().subscribe(
            data => this.forumList = data['@template'].forumrow,
            err => console.log(err)
        );
    }

}

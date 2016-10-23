import { Component, OnInit } from '@angular/core';
import { PhpbbApiService } from '../phpbb-api.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    constructor(public phpbbApi: PhpbbApiService) { }
    public unreadTopic;

    ngOnInit() {
        this.getUnreadTopic();
    }

    public getUnreadTopic(){
        this.phpbbApi.getUnreadTopic().subscribe(
            data => this.unreadTopic = data.searchresults,
            err => console.log(err)
        );
    }
}

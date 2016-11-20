import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject} from 'rxjs/Rx';
import { PhpbbApiService } from './phpbb-api.service';

@Injectable()
export class PhpbbService {

    constructor(private phpbbApi: PhpbbApiService){}

    public getUnreadTopicList(){
        let UnreadTopicList = new BehaviorSubject([]);
        this.phpbbApi.getSearch('unreadposts').subscribe(
            data => UnreadTopicList.next(data['@template'].searchresults),
            err => console.log(err)
        );
        return UnreadTopicList;
    }

    public getPrivateMessageList(){
        let privateMessageList = new BehaviorSubject([]);
        this.phpbbApi.getPrivateMessageList().subscribe(
            data => privateMessageList.next(data['@template'].messagerow),
            err => console.log(err)
        );
        return privateMessageList;
    }

    public getTopicById(topicId:number, offset:number = 0){
        let topicData = new BehaviorSubject([]);
        this.phpbbApi.getTopicById(topicId, offset).subscribe(
            data => topicData.next(data['@template'].postrow),
            err => console.log(err)
        );
        return topicData;
    }
}

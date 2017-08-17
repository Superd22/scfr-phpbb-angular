import { UnicodeToUtf8Pipe } from './../pipes/unicode-to-utf8.pipe';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { PhpbbApiService } from './phpbb-api.service';

@Injectable()
export class PhpbbService {

    private unreadTopics: ReplaySubject<any> = null;
    private privateMessages: ReplaySubject<any> = null;

    constructor(private phpbbApi: PhpbbApiService) { }

    public getUnreadTopicList(force?: boolean) {
        let call = this.phpbbApi.getSearch('unreadposts').map(
            data => UnicodeToUtf8Pipe.forEach(data['@template'].searchresults),
            err => console.log(err)
        );

        return this.cacheOrFetch(call, "unreadTopics", force);
    }

    public getPrivateMessageList(force?: boolean) {

        let call = this.phpbbApi.getPrivateMessageList().map(
            data => data['@template'].messagerow,
            err => console.log(err)
        );

        return this.cacheOrFetch(call, "privateMessages", force);
    }

    public getTopicById(topicId: number, offset: number = 0) {
        let topicData = new BehaviorSubject([]);
        this.phpbbApi.getTopicById(topicId, offset).subscribe(
            data => topicData.next(data['@template'].postrow),
            err => console.log(err)
        );
        return topicData;
    }

    /**
     * Helper function to cache a value and fetch only if we need to
     * @param call the call to make if we wanna fetch
     * @param cacheName name of the cache belonging to this service
     * @param force if we want to force the update
     */
    private cacheOrFetch(call: Observable<any>, cacheName: string, force?: boolean) {
        let cache: ReplaySubject<any> = this[cacheName];

        // Fetch if we don't have a value or if we're forcing
        if (!cache || force == true) {
            // If we don't have a value we create an observer
            if (!cache) this[cacheName] = new ReplaySubject<any>(1);

            call.subscribe((data) => {
                this[cacheName].next(data);
            });
        }

        return this[cacheName];
    }
}

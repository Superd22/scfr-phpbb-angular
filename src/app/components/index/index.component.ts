import { StateTranslate } from './../../services/state-translate.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { PhpbbService } from '../../services/phpbb.service';
import { LoginService } from '../../services/login.service';
import { UnreadResponse } from "app/models/Search/UnreadReponse";

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
    public unreadTopicList;
    public privateMessages;
    public isLoggedIn;
    /** all the availables forums */
    public forumList: UnreadResponse.JumpboxForum[];

    constructor(public phpbb: PhpbbService, public LoginService: LoginService, protected stateT: StateTranslate) { }

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

        this.stateT.latestTemplateData.subscribe((data) => {
            this.forumList = this.filterForumsToDisplay(data.jumpbox_forums);
        });
    }

    ngOnDestroy() {
    }

    /**
     * Filters all the forums to render only the top-most we need to display (categories)
     * @param forums all the forums
     * @return array of forums to display
     */
    private filterForumsToDisplay(forums: UnreadResponse.JumpboxForum[]): UnreadResponse.JumpboxForum[] {
        return forums.filter((forum) => forum.FORUM_ID > 0 && !forum.level);
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

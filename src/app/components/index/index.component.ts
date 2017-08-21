import { IGuideDesNouveauxResponse } from './interfaces/guide-des-nouveaux.interface';
import { WpService } from 'app/services/wp.service';
import { StateTranslate } from './../../services/state-translate.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Component, OnInit } from '@angular/core';
import { PhpbbService } from '../../services/phpbb.service';
import { LoginService } from '../../services/login.service';
import { PhpbbComponent } from '../phpbb/phpbb-component.component';
import { UnreadResponse } from '../../models/Search/UnreadReponse';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends PhpbbComponent {
    public unreadTopicList;
    public ownMessages;
    public isLoggedIn;
    /** all the availables forums */
    public forumList: UnreadResponse.JumpboxForum[];
    public guideNouveau: IGuideDesNouveauxResponse;
    public onlineMembers = [];

    constructor(public phpbb: PhpbbService, public loginService: LoginService, protected stateT: StateTranslate, protected wp: WpService) { 
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loginService.userStatus.subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
                if (isLoggedIn) {
                    this.getUserSpecificData();
                }
            }
        );

        this.stateT.latestTemplateData.subscribe((data) => {
            this.forumList = this.filterForumsToDisplay(data.jumpbox_forums);
            if(data.LOGGED_IN_USER_LIST) this.onlineMembers = data.LOGGED_IN_USER_LIST;
        });

        this.wp.getGuideDesNouveaux().subscribe((guide) => {
            if (guide) this.guideNouveau = guide;
        });
    }

    /**
     * Filters all the forums to render only the top-most we need to display (categories)
     * @param forums all the forums
     * @return array of forums to display
     */
    private filterForumsToDisplay(forums: UnreadResponse.JumpboxForum[]): UnreadResponse.JumpboxForum[] {
        return forums.filter((forum) => forum.FORUM_ID > 0 && !forum.level);
    }

    public getUserSpecificData() {
        this.phpbb.getUnreadTopicList().subscribe(
            data => this.unreadTopicList = data ? data.slice(0, 5) : null,
            err => console.log(err)
        );

        this.phpbb.getUserMessage().subscribe((data) => {
            this.ownMessages = data ? data.slice(0, 3) : null;
        });
    }


    public get guideNewbiesParts() {
        return Object.keys(this.guideNouveau.pageTree);
    }

    public get displayOnlineMembers() {
        return this.onlineMembers.slice(0, 20);
    }
}

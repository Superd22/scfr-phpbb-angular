import { Collected } from 'ng2-rx-collector';
import { PhpbbWebsocketService } from './../../services/phpbb-websocket.service';
import { IPHPBBIndexForum } from './../../interfaces/phpbb/phpbb-index-forum';
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
    /** information on every forums */
    public forumMap = new Map<number, IPHPBBIndexForum>();
    public guideNouveau: IGuideDesNouveauxResponse;
    public onlineMembers = [];

    @Collected() private _collected;

    private _userSpecificFetch = 0;

    constructor(public phpbb: PhpbbService, public loginService: LoginService, protected stateT: StateTranslate, protected wp: WpService,
        private ws: PhpbbWebsocketService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.loginService.userStatus.takeUntil(this._collected).subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
                if (isLoggedIn) {
                    this.getUserSpecificData();
                }
            }
        );

        this.ws.onPosting.takeUntil(this._collected).subscribe((data) => {
            if(this.isLoggedIn) this.getUserSpecificData();
        });

        this.stateT.latestTemplateData.takeUntil(this._collected).subscribe((data) => {
            this.forumList = this.filterForumsToDisplay(data.jumpbox_forums);
            this.forumMap = this.mapForums(data.forumrow)
            if (data.LOGGED_IN_USER_LIST) this.onlineMembers = data.LOGGED_IN_USER_LIST;
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

    private mapForums(forums: IPHPBBIndexForum[]) {
        let map = new Map();

        if (forums)
            forums.map((forum) => {
                map.set(Number(forum.FORUM_ID), forum);
            });

        return map;
    }

    public getUserSpecificData() {
        if (this._userSpecificFetch <= 0) {
            this._userSpecificFetch = 2;
            this.phpbb.getUnreadTopicList(true).subscribe(
                data => {
                    this.unreadTopicList = data ? data.slice(0, 5) : null;
                    this._userSpecificFetch -= 1;
                },
                err => console.log(err)
            );

            this.phpbb.getUserMessage(true).subscribe((data) => {
                this.ownMessages = data ? data.slice(0, 3) : null;
                this._userSpecificFetch -= 1;
            });
        }
    }

    public markEverythingRead() {
        if (this.tpl.U_MARK_FORUMS)
            this.phpbbApi.getPhpbbAjaxPage(this.tpl.U_MARK_FORUMS).subscribe(
                (data) => {
                    // Check for errors
                    if (data.S_ERROR)
                        return this.phpbbApi.errorSnackBar(data.MESSAGE_TEXT);

                    // @todo mark all read

                    // Notify the user
                    return this.phpbbApi.openSnackBar(data.MESSAGE_TEXT);
                }
            );
    }


    public get guideNewbiesParts() {
        return Object.keys(this.guideNouveau.pageTree);
    }

    public get displayOnlineMembers() {
        return this.onlineMembers.slice(0, 20);
    }
}

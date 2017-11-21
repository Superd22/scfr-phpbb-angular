import { ObservableMedia } from '@angular/flex-layout';
import { UiServiceService } from './../../material/services/ui-service.service';
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
import { SCFRLocalStorage } from 'app/decorators/LocalStorage.decorator';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends PhpbbComponent {
    public unreadTopicList;
    public ownMessages;
    public isLoggedIn;
    public guideNouveau: IGuideDesNouveauxResponse;
    public onlineMembers = [];
    /** the currently active tab */
    @SCFRLocalStorage("scfr:index:activetab") public activeTab: string;

    @Collected() private _collected;

    private _userSpecificFetch = 0;
    public rowOnTop = true;

    constructor(
        public phpbb: PhpbbService,
        public loginService: LoginService,
        protected stateT: StateTranslate,
        protected wp: WpService,
        private ws: PhpbbWebsocketService,
        private media: ObservableMedia
    ) {
        super();

        if (!this.activeTab) this.activeTab = "forum";
    }

    ngOnInit() {
        super.ngOnInit();
        this.loginService.userStatus.takeUntil(this._collected).subscribe(
            (isLoggedIn) => {
                this.isLoggedIn = isLoggedIn;
            }
        );

        this.media.subscribe((newMedia) => {
            // > sm
            if (newMedia.mqAlias == "md" || newMedia.mqAlias == "lg" || newMedia.mqAlias == "xl") {
                this.rowOnTop = true;
            }
            else this.rowOnTop = false;
        });

        this.stateT.latestTemplateData.takeUntil(this._collected).subscribe((data) => {
            if (data.LOGGED_IN_USER_LIST) this.onlineMembers = data.LOGGED_IN_USER_LIST;
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

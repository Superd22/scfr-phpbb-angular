import { FilteredForumsPipeResult } from './pipes/filtered-forums.pipe';
import { FilteredResults } from './../../pipes/get-filtered-result.pipe';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Component, OnInit } from '@angular/core';
import { IndexResponse } from '../../models/IndexResponse';

import { PhpbbApiService } from '../../services/phpbb-api.service';
import { LoginService } from '../../services/login.service';
import { UnreadResponse } from "../../models/Search/UnreadReponse";


@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
    /** all the availables forums */
    private _forumList: UnreadResponse.JumpboxForum[];
    /** the mmain map parent => children[] */
    public forumMap: Map<number, number[]> = new Map<number, number[]>();
    /** reverse map with child => parent */
    public reverseMap: Map<number, number> = new Map<number, number>();
    /** holder of the states we need to display */
    public filteredForumList: FilteredForumsPipeResult = { original: [], extended: [] };
    /** current string search for forums */
    public searchForum: string = "";

    constructor(private stateT: StateTranslate, public LoginService: LoginService) { }

    public get forumList() {
        return this._forumList;
    }

    public set forumList(set) {
        this._forumList = set;
    }

    ngOnInit() {
        this.fetchForumList();
    }

    public fetchForumList(): void {
        this.stateT.latestTemplateData.subscribe((data) => {
            if (data.jumpbox_forums && data.jumpbox_map) {
                this.handleForumJumpBox(data.jumpbox_forums, data.jumpbox_map);
            }
            // Should never happen.
            else throw "NO JUMPBOX FORUM FROM TEMPLATE";
        });
    }

    private handleForumJumpBox(jumpbox: UnreadResponse.JumpboxForum[], map) {
        // Create main map
        for (let pp in map) {
            this.forumMap.set(Number(pp), map[pp]);
        }

        // Create reverse map
        this.forumMap.forEach((children, parent) => {
            children.forEach((child) => {
                this.reverseMap.set(child, parent);
            });
        })

        this.forumList = [];
        this.forumList = jumpbox;
    }

    public shouldFilterDisplay() {
        let display = []
    }

    public getChildrenOfForum(forum: UnreadResponse.JumpboxForum): UnreadResponse.JumpboxForum[]
    public getChildrenOfForum(forumId: number): UnreadResponse.JumpboxForum[]
    public getChildrenOfForum(forum): UnreadResponse.JumpboxForum[] {
        if (typeof forum != typeof 123) forum = forum.FORUM_ID;

        return this.forumList.filter((testForum) => this.forumMap.get(forum).indexOf(testForum.FORUM_ID) > -1)
    }

    public toggleMenu(menuItem) {
        menuItem.toggledDropdown = !menuItem.toggledDropdown;
    }

}

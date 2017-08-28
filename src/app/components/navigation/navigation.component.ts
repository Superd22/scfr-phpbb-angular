import { ForumLinkComponent } from './forum-link/forum-link.component';
import { FilteredForumsPipeResult } from './pipes/filtered-forums.pipe';
import { FilteredResults } from './../../pipes/get-filtered-result.pipe';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
    private _forumList: UnreadResponse.JumpboxForum[] = [];
    /** the mmain map parent => children[] */
    public forumMap: { [parentId: number]: UnreadResponse.JumpboxForum[] } = { 0: [] };
    /** holder of the states we need to display */
    public filteredForumList: FilteredForumsPipeResult = { original: [], extended: [] };
    /** current string search for forums */
    public searchForum: string = "";

    @Input("toggle")
    public _toggle: boolean;
    @Output()
    public toggleChange = new EventEmitter<boolean>();

    public get toggle(): boolean { return this._toggle; }
    public set toggle(toggle: boolean) { this._toggle = toggle; this.toggleChange.emit(toggle); }

    private _registeredForums: { [forumId: number]: ForumLinkComponent } = {};

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

    /**
     * grab the forum list from the current template
     */
    public fetchForumList(): void {
        this.stateT.latestTemplateData.subscribe((data) => {
            if (data.jumpbox_forums) {
                // Only trigger if the list actually changed.
                if (data.jumpbox_forums.length != this.forumList.length) {
                    this.forumList = UnicodeToUtf8Pipe.forEach(data.jumpbox_forums);
                    this.handleForumJumpBox(data.jumpbox_forums, data.jumpbox_map);
                }
            }
            // Should never happen.
            else throw "NO JUMPBOX FORUM FROM TEMPLATE";
        });
    }

    /**
     * Creates our hiearchy of forum/sub-forums 
     * 
     * @param jumpbox 
     * @param map 
     */
    private handleForumJumpBox(jumpbox: UnreadResponse.JumpboxForum[], map) {
        let jb = jumpbox.slice();
        this.forumMap = map;

        // For each parent
        Object.keys(this.forumMap).forEach(fId => {
            let childrenForum = [];
            // If we have children
            if (this.forumMap[fId] && this.forumMap[fId].length > 0)
                // For each children
                this.forumMap[fId].forEach((child) => {
                    // Get the information of the child
                    for (let i = 0; i < jb.length; i++) {
                        if (jb[i].FORUM_ID == child) {
                            // Add it
                            childrenForum.push(jb[i]);
                            // remove from our copy
                            jb.splice(i, 1);
                            break;
                        }
                    }
                });

            // Add the information to the parent map
            this.forumMap[fId] = childrenForum;

        });
    }

    public shouldFilterDisplay() {
        // parents we should open
        let parents: ForumLinkComponent[] = [];
        // forum whose children we should open
        let children: number[] = [];


        this._forumList.map((forum) => {
            // check we have the forum component
            if (this._registeredForums[Number(forum.FORUM_ID)]) {
                // No search, set to true.
                if (!this.searchForum) this._registeredForums[Number(forum.FORUM_ID)].searchVisible = true;
                // We want this forum.
                else if (forum.FORUM_NAME.toLowerCase().indexOf(this.searchForum.toLowerCase()) > -1) {
                    // We're gonna display it
                    this._registeredForums[Number(forum.FORUM_ID)].searchVisible = true;
                    // We're gonna make sure all its ancestors are displayed
                    parents.push(this._registeredForums[Number(forum.FORUM_ID)].parent);
                    // We're gonna make sure its children are displayed
                    children.push(Number(forum.FORUM_ID));
                }
                // We don't want this forum
                else this._registeredForums[Number(forum.FORUM_ID)].searchVisible = false;
            }
        });

        const doDaddies = (forum: ForumLinkComponent) => {
            if (forum) {
                forum.searchVisible = true;
                if (forum.parent) doDaddies(forum.parent);
            }
        };

        parents.forEach((parent) => {
            doDaddies(parent);
        });

        const doChildren = (forumId: number) => {
            if (this.forumMap[forumId])
                this.forumMap[forumId].map((forum) => Number(forum.FORUM_ID)).map((fId) => this._registeredForums[fId]).map(
                    (forumComponent) => {
                        forumComponent.searchVisible = true;
                        doChildren(Number(forumComponent.forum.FORUM_ID));
                    }
                );
        }

        children.forEach((parentId) => {
            doChildren(parentId);
        });
    }

    public getChildrenOfForum(forum: UnreadResponse.JumpboxForum): UnreadResponse.JumpboxForum[]
    public getChildrenOfForum(forumId: number): UnreadResponse.JumpboxForum[]
    public getChildrenOfForum(forum): UnreadResponse.JumpboxForum[] {
        if (typeof forum != typeof 123) forum = forum.FORUM_ID;

        return this.forumMap[forum];
    }

    public toggleMenu(menuItem) {
        menuItem.toggledDropdown = !menuItem.toggledDropdown;
    }

    /**
     * Registers a forum for search purposes
     * @param id the id of the forum
     * @param forum the component
     */
    public registerForum(id: number, forum: ForumLinkComponent) {
        this._registeredForums[Number(id)] = forum;
    }

}

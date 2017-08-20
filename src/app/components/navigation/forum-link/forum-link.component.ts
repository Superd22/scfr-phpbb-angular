import { SCFRLocalStorage } from './../../../decorators/LocalStorage.decorator';
import { StateTranslate } from './../../../services/state-translate.service';
import { PhpbbWebsocketService } from './../../../services/phpbb-websocket.service';
import { Collected, CollectorEvent } from 'ng2-rx-collector';
import { NavigationComponent } from './../navigation.component';
import { Component, OnInit, Input, QueryList, EventEmitter, Output, AfterViewInit, ViewChildren, Query, ChangeDetectorRef } from '@angular/core';
import { UnreadResponse } from "../../../models/Search/UnreadReponse";

@Component({
  selector: 'scfr-forum-navigation-forum-link',
  templateUrl: './forum-link.component.html',
  styleUrls: ['./forum-link.component.scss']
})
export class ForumLinkComponent implements OnInit {

  /** this forum object */
  @Input("forum")
  public forum: UnreadResponse.JumpboxForum;
  /** the main nav component */
  @Input("navCo")
  public navCo: NavigationComponent;
  /** the current depth */
  @Input()
  public depth: number;
  /** toggle for our sub-forums if any */
  private _toggleDisplay: boolean;
  /** change to our toggles */
  @Output() toggleChange = new EventEmitter<boolean>();
  /** our computed children */
  public cacheChildren: UnreadResponse.JumpboxForum[] = null;
  /** changes to this unread status */
  @Output() public unreadChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  /** collector for end ws observable */
  @Collected() private collected: CollectorEvent;
  private toggled: boolean = null;


  constructor(private ws: PhpbbWebsocketService, private stateT: StateTranslate) { }

  ngOnInit() {
    if (this.depth > 1) this.toggleDisplaySub = false;
    else this.toggleDisplaySub = true;

    this.subForumsToDisplay();
    this.setUnread(this.computeUnreadStatus());

    this.ws.onNewPostsInForum(Number(this.forum.FORUM_ID), false).takeUntil(this.collected).subscribe(
      data => {
        this.setUnread(true);
      }
    );

    SCFRLocalStorage("sidenav:toggle:forum:" + this.forum.FORUM_ID)(this, "toggleDisplaySub");

  }

  public get toggleDisplaySub(): boolean { return this._toggleDisplay; }
  public set toggleDisplaySub(b: boolean) {
    this._toggleDisplay = b;
    this.toggleChange.emit(b);
  }

  public toggleDisplay(): void {
    this.toggleChange.emit(!this.toggleDisplaySub);
    this.toggleDisplaySub = !this.toggleDisplaySub;
  }


  /**
   * Toggle the display of sub-forum (children forums)
   */
  public childrenToggled(): void {
    // Prevent redraw on this call 
    setTimeout(() =>
      this.toggled = !this.toggled);
  }

  /**
   * If this current forum is shown to the user, based on its search
   * @return boolean
   */
  public get visible(): boolean {
    // Visible if we're in the extended results of the user's search.
    return this.navCo.filteredForumList.extended.indexOf(Number(this.forum.FORUM_ID)) > -1;
  }

  /**
   * Compute if this forum should be marked as unread or read based on its own status
   * as well as the status of his children
   * 
   * @return true for unread
   */
  public computeUnreadStatus(): boolean {
    let CUSR = (children: UnreadResponse.JumpboxForum[]) => {
      let unread = false;

      if (!children || children.length == 0) return unread;

      for (let i = 0; (i < children.length) && !unread; i++) {
        if (children[i].UNREAD) {
          unread = true;
        }
        else {
          let childChildrens = this.navCo.forumMap.get(Number(children[i].FORUM_ID));
          if (childChildrens) unread = CUSR(this.navCo.forumList.filter((forum) => childChildrens.indexOf(Number(forum.FORUM_ID)) > -1));
        }
      }

      return unread;
    }


    return this.forum.UNREAD || CUSR(this.cacheChildren);
  }

  public setUnread(unread: boolean) {
    this.forum.UNREAD = unread;
  }

  /**
   * Convenience method to get the subforum we need to display
   * @param force if we want to force the update (uses cache otherwise.)
   */
  public subForumsToDisplay(force?: boolean): UnreadResponse.JumpboxForum[] {
    if (this.cacheChildren && !force) return this.cacheChildren;

    // Forums to display
    let disp = this.navCo.filteredForumList.extended;
    // The children we own
    let children = this.navCo.forumMap.get(Number(this.forum.FORUM_ID));

    if (!disp || !children) return null;

    let retSubs = [];
    disp.forEach((disp) => {
      if (children.indexOf(disp) > -1 && retSubs.indexOf(disp) == -1) retSubs.push(disp);
    });


    this.cacheChildren = this.navCo.forumList.filter((testForum) => retSubs.indexOf(Number(testForum.FORUM_ID)) > -1);

    return this.cacheChildren;
  }

}

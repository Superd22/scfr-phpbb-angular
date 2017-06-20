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

  @Input("forum")
  public forum: UnreadResponse.JumpboxForum
  @Input("navCo")
  public navCo: NavigationComponent;
  @Input()
  public depth: number;
  public toggleDisplaySub: boolean;
  public cacheChildren: UnreadResponse.JumpboxForum[] = null;

  //@ViewChildren(ForumLinkComponent)
  //public children: QueryList<ForumLinkComponent>;

  @Output() public unreadChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Collected() private collected: CollectorEvent;


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

  /**
   * Compute if this forum should be marked as unread or read based on its own status
   * as well as the status of his children
   * 
   * @return boolean true for unread
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

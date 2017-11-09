import { PhpbbService } from './../../../services/phpbb.service';
import { ThrottlerService } from 'app/services/throttler.service';
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
  private _forumId: number;

  public get forum(): UnreadResponse.JumpboxForum {
    return this.navCo.forumList.get(Number(this._forumId));
  }

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
  /** collector for end ws observable */
  @Collected() private collected: CollectorEvent;
  /** our children forums */
  @ViewChildren(ForumLinkComponent)
  private _subForums: QueryList<ForumLinkComponent>;
  /** if we're visible */
  public _searchVisible = true;

  public toggled: boolean = null;
  @Input()
  public parent: ForumLinkComponent;


  constructor(private ws: PhpbbWebsocketService, private stateT: StateTranslate, private throttle: ThrottlerService,
    private phpbb: PhpbbService) { }

  ngOnInit() {
    if (this.depth > 1) this.toggleDisplaySub = false;
    else this.toggleDisplaySub = true;

    // Get our children ids
    const childrenIds = this.subForumsToDisplay() ? this.subForumsToDisplay().map((forum) => Number(forum.FORUM_ID)) : [];

    // Subscribe to children events
    this.phpbb.forumReadStatus.filter((event) => childrenIds.indexOf(event.forumId) > -1).takeUntil(this.collected).subscribe((event) => {
      // If our child is unread, so are we.
      if (event.unread) this.unread = event.unread;
      // Else we need to compute 
      this.computeUnreadStatus();
    });

    // Subscribe to ws events
    this.ws.onNewPostsInForum(Number(this.forum.FORUM_ID), false).takeUntil(this.collected).subscribe(
      data => {
        this.unread = true;
      }
    );

    this.navCo.registerForum(Number(this.forum.FORUM_ID), this);

    SCFRLocalStorage("sidenav:toggle:forum:" + this.forum.FORUM_ID)(this, "toggleDisplaySub");

  }

  ngAfterViewInit() {
  }

  public get toggleDisplaySub(): boolean { return this._toggleDisplay; }
  public set toggleDisplaySub(b: boolean) {
    this._toggleDisplay = b;
    this.toggleChange.emit(b);
  }

  public toggleDisplay(forceSet = null): void {
    this.toggleChange.emit((forceSet || !this.toggleDisplaySub));
    this.toggleDisplaySub = forceSet || !this.toggleDisplaySub;
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
    return this._searchVisible;
  }

  public set searchVisible(visible: boolean) {
    this._searchVisible = visible;

    // Update our parent -later-
    //if(this._searchVisible && this.parent) setTimeout(() => this.parent.searchVisible = true);
  }

  /**
   * Compute if this forum should be marked as unread or read based on its own status
   * as well as the status of his children
   * 
   * @return true for unread
   */
  public computeUnreadStatus = () => {
    // We're unread, no need to calculate anything
    if (this.unread) return;

    let flag = false;

    if (this._subForums)
      // If one of our sub-forum is unread, so r we.
      this._subForums.forEach((forum) => { if (forum.unread) flag = true });

    if (flag) this.unread = true;
  }

  /**
   * Change the unread status of this forum
   * @param unread the unread status
   */
  public set unread(unread: boolean) {
    if (this.forum.UNREAD != unread) {
      this.forum.UNREAD = unread;
      this.phpbb.forumReadStatus.next({
        forumId: Number(this.forum.FORUM_ID),
        unread: unread
      });
    }
  }

  public get unread(): boolean {
    return this.forum.UNREAD;
  }

  /**
   * Convenience method to get the subforum we need to display
   * @param force if we want to force the update (uses cache otherwise.)
   */
  public subForumsToDisplay(force?: boolean): UnreadResponse.JumpboxForum[] {
    if (this.cacheChildren && !force) return this.cacheChildren;

    this.cacheChildren = this.navCo.getChildrenOfForum(this.forum);

    return this.cacheChildren;
  }

}

import { NavigationComponent } from './../navigation.component';
import { Component, OnInit, Input } from '@angular/core';
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
  public cacheChildren;

  constructor() { }

  ngOnInit() {
    if(this.depth > 1) this.toggleDisplaySub = false;
    else this.toggleDisplaySub = true;
  }

  /**
   * Convenience method to get the subforum we need to display
   */
  public get subForumsToDisplay(): UnreadResponse.JumpboxForum[] {
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

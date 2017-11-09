import { Collected } from 'ng2-rx-collector';
import { PhpbbService } from './../../../../../services/phpbb.service';
import { PhpbbSubComponent } from './../../../../phpbb/phpbb-sub-component.component';
import { Component, OnInit, Input } from '@angular/core';
import { IPHPBBIndexSubForumRow } from './subforum/subforum.component';
@Component({
  selector: 'scfr-forum-index-tab-forum-row-forum',
  templateUrl: './row-forum.component.html',
  styleUrls: ['./row-forum.component.scss']
})
export class RowForumComponent extends PhpbbSubComponent {

  @Input() public forum: IPHPBBIndexForumRow
  protected _lastPostParams;

  @Collected() private _collected;

  constructor(protected phpbb: PhpbbService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();


    this.phpbb.forumReadStatus.takeUntil(this._collected)
      .filter((data) => data.forumId === Number(this.forum.FORUM_ID)).subscribe((data) => {
        // We just got said that we were unread.
        if (data.unread) this.forum.S_UNREAD_FORUM = true;
      });
  }

  public get lastPostParams() {
    if (!this._lastPostParams) {
      const regex = new RegExp(/viewtopic\.php\?f=([0-9]*).*p=([0-9]*)/);
      const m = regex.exec(this.forum.U_LAST_POST);

      if (m && m[1] && m[2]) this._lastPostParams = { forumId: Number(m[1]), topicId: '', p: Number(m[2]) };
    }

    return this._lastPostParams;
  }

}

export interface IPHPBBIndexForumRow {
  FORUM_DESC: string;
  FORUM_FOLDER_IMG: string;
  FORUM_FOLDER_IMG_ALT: string;
  FORUM_ID: string;
  FORUM_IMAGE: string;
  FORUM_IMAGE_SRC: string;
  FORUM_IMG_STYLE: string;
  FORUM_NAME: string;
  LAST_POSTER: string;
  LAST_POSTER_COLOUR: string;
  LAST_POSTER_FULL: string;
  LAST_POST_SUBJECT: string;
  LAST_POST_SUBJECT_TRUNCATED: string;
  LAST_POST_TIME: string;
  L_MODERATOR_STR: string;
  L_SUBFORUM_STR: string;
  MODERATORS: string;
  POSTS: number;
  SUBFORUMS: string;
  S_AUTH_READ: number;
  S_BLOCK_NAME: string;
  S_DISPLAY_SUBJECT: boolean;
  S_FEED_ENABLED: boolean;
  S_IS_CAT: boolean;
  S_IS_LINK: boolean;
  S_LIST_SUBFORUMS: boolean;
  S_LOCKED_FORUM: boolean;
  S_NO_CAT: boolean;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
  S_SUBFORUMS: boolean;
  S_UNREAD_FORUM: boolean;
  TOPICS: number;
  U_LAST_POST: string;
  U_LAST_POSTER: string;
  U_UNAPPROVED_POSTS: string;
  U_UNAPPROVED_TOPICS: string;
  U_VIEWFORUM: string;
  subforum?: IPHPBBIndexSubForumRow[];
}

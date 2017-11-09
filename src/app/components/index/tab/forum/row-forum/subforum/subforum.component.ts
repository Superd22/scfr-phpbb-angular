import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-forum-subforum',
  templateUrl: './subforum.component.html',
  styleUrls: ['./subforum.component.scss']
})
export class SubforumComponent implements OnInit {

  @Input() public subForum: IPHPBBIndexSubForumRow;
  private _subParams;
  constructor() { }

  ngOnInit() {
  }

  public get subForumParams() {
    if (!this._subParams) {
      const regex = new RegExp(/viewforum\.php\?f=([0-9]*)/);
      const m = regex.exec(this.subForum.U_SUBFORUM);

      if (m && m[1]) this._subParams = { forumId: Number(m[1]) };
    }

    return this._subParams;
  }
}

export interface IPHPBBIndexSubForumRow {
  IS_LINK: boolean;
  SUBFORUM_NAME: string;
  S_BLOCK_NAME: string;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
  S_UNREAD: boolean;
  U_SUBFORUM: string;
}
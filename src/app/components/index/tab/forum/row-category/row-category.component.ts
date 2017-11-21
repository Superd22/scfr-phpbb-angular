import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-forum-row-category',
  templateUrl: './row-category.component.html',
  styleUrls: ['./row-category.component.scss']
})
export class RowCategoryComponent implements OnInit {
  @Input() public category: IPHPBBIndexForumCat
  constructor() { }

  ngOnInit() {
  }

}

export interface IPHPBBIndexForumCat {
  FORUM_DESC: string
  FORUM_FOLDER_IMG: string
  FORUM_FOLDER_IMG_SRC: string;
  FORUM_ID: string;
  FORUM_IMAGE: string;
  FORUM_IMAGE_SRC: string;
  FORUM_NAME: string;
  S_BLOCK_NAME: "forumrow"
  S_FIRST_ROW: boolean;
  S_IS_CAT: true;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
  U_VIEWFORUM: string;
}
import { IPhpbbViewforumForumrow } from './interfaces/phpbb-viewforum-forumrow.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewforum-forum-row',
  templateUrl: './viewforum-forum-row.component.html',
  styleUrls: ['./viewforum-forum-row.component.scss']
})
export class ViewforumForumRowComponent implements OnInit {

  @Input()
  public forum: IPhpbbViewforumForumrow;
  constructor() { }

  ngOnInit() {
  }

}

import { PhpbbService } from './../../../services/phpbb.service';
import { Collected } from 'ng2-rx-collector';
import { PhpbbWebsocketService } from './../../../services/phpbb-websocket.service';
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
  @Collected() private _collected;
  constructor(private phpbb: PhpbbService) { }

  ngOnInit() {
    this.phpbb.forumReadStatus.filter((event) => event.forumId === Number(this.forum.FORUM_ID))
    .takeUntil(this._collected).subscribe((event) => {
      if(event.unread) this.forum.S_UNREAD_FORUM = true;
    });
  }

}

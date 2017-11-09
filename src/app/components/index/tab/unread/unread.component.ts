import { PhpbbService } from './../../../../services/phpbb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-unread',
  templateUrl: './unread.component.html',
  styleUrls: ['./unread.component.scss']
})
export class UnreadComponent implements OnInit {
  public unreadTopicList;

  constructor(protected phpbb: PhpbbService) { }

  ngOnInit() {
    this.phpbb.getUnreadTopicList(true).subscribe(
      data => this.unreadTopicList = data,
      err => console.log(err)
    );
  }

}

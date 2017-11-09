import { PhpbbService } from './../../../../services/phpbb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-last',
  templateUrl: './last.component.html',
  styleUrls: ['./last.component.scss']
})
export class LastComponent implements OnInit {
  public latestTopics;
  constructor(protected phpbb: PhpbbService) { }

  ngOnInit() {
    this.phpbb.getLatestTopicList(true).subscribe((data) => {
      this.latestTopics = data;
    });
  }

}

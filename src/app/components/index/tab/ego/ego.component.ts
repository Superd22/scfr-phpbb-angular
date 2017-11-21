import { PhpbbService } from './../../../../services/phpbb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-ego',
  templateUrl: './ego.component.html',
  styleUrls: ['./ego.component.scss']
})
export class EgoComponent implements OnInit {
  public egoTopics;
  constructor(protected phpbb: PhpbbService) { }

  ngOnInit() {
    this.phpbb.getUserMessage(true).subscribe((data) => {
      this.egoTopics = data;
    });
  }
}

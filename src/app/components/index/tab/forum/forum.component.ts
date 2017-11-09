import { PhpbbSubComponent } from './../../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent extends PhpbbSubComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

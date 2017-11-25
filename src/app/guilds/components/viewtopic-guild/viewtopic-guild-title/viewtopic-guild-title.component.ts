import { Component, OnInit } from '@angular/core';
import { PhpbbSubComponent } from 'app/components/phpbb/phpbb-sub-component.component';

@Component({
  selector: 'scfr-forum-viewtopic-guild-title',
  templateUrl: './viewtopic-guild-title.component.html',
  styleUrls: ['./viewtopic-guild-title.component.scss']
})
export class ViewtopicGuildTitleComponent extends PhpbbSubComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

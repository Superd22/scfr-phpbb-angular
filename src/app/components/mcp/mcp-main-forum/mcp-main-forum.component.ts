import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main-forum',
  templateUrl: './mcp-main-forum.component.html',
  styleUrls: ['./mcp-main-forum.component.scss']
})
export class McpMainForumComponent extends PhpbbSubComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main',
  templateUrl: './mcp-main.component.html',
  styleUrls: ['./mcp-main.component.scss']
})
export class McpMainComponent extends PhpbbSubComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

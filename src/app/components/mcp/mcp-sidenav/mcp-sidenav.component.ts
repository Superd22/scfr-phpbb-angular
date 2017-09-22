import { PhpbbSubComponent } from '../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-sidenav',
  templateUrl: './mcp-sidenav.component.html',
  styleUrls: ['./mcp-sidenav.component.scss']
})
export class McpSidenavComponent extends PhpbbSubComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
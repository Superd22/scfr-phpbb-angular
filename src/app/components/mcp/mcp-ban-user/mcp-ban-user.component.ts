import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-ban-user',
  templateUrl: './mcp-ban-user.component.html',
  styleUrls: ['./mcp-ban-user.component.scss']
})
export class McpBanUserComponent extends PhpbbSubComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

import { Component, OnInit } from '@angular/core';
import { PhpbbComponent } from "../phpbb/phpbb-component.component";

@Component({
  selector: 'scfr-forum-mcp',
  templateUrl: './mcp.component.html',
  styleUrls: ['./mcp.component.scss']
})
export class McpComponent extends PhpbbComponent {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { MD_DIALOG_DATA } from '@angular/material';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main-forum-topic-select',
  templateUrl: './mcp-main-forum-topic-select.component.html',
  styleUrls: ['./mcp-main-forum-topic-select.component.scss']
})
export class McpMainForumTopicSelectComponent extends PhpbbSubComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) tpl: IPhpbbTemplate) {
    super();
    this.tpl = tpl;
  }

  ngOnInit() {
  }

}

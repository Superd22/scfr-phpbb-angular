import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main-topic',
  templateUrl: './mcp-main-topic.component.html',
  styleUrls: ['./mcp-main-topic.component.scss']
})
export class McpMainTopicComponent extends PhpbbSubComponent implements OnInit {

  public activeTab: 'merge-panel' | 'split-panel' | 'display-panel' = null;

  @SCFRUIParam('start')
  private _start;


  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public changePage(n: number) {
    let start = (n - 1) * 15;

    console.log(start);

    this._start = start;
  }

}

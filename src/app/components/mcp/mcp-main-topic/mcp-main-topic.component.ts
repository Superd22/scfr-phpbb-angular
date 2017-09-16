import { UcpPhpbbFieldComponent } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main-topic',
  templateUrl: './mcp-main-topic.component.html',
  styleUrls: ['./mcp-main-topic.component.scss']
})
export class McpMainTopicComponent extends PhpbbSubComponent implements OnInit {

  public activeTab: 'merge-panel' | 'split-panel' | 'display-panel' = null;

  @SCFRUIParam('start')
  private _start;

  @ViewChildren(UcpPhpbbFieldComponent)
  private _fields: QueryList<UcpPhpbbFieldComponent>;


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

  public checkAll() {
    if (!this._fields) return;

    this._fields.map((field) => {
      if (field.form_name == "post_id_list[]") field.model = true;
    });
  }

  public unCheckAll() {
    if (!this._fields) return;

    this._fields.map((field) => {
      if (field.form_name == "post_id_list[]") field.model = false;
    });

  }

}

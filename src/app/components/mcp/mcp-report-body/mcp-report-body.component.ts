import { IPhpbbFieldOption } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { MD_DIALOG_DATA } from '@angular/material';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { McpSubPopoutComponent } from './../mcp-sub-popout/mcp-sub-popout.component';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-report-body',
  templateUrl: './mcp-report-body.component.html',
  styleUrls: ['./mcp-report-body.component.scss']
})
export class McpReportBodyComponent extends McpSubPopoutComponent {

  constructor( @Inject(forwardRef(() => PhpbbFormHelperService)) public formHelper: PhpbbFormHelperService, @Inject(MD_DIALOG_DATA) public tpl: IPhpbbTemplate) {
    super(formHelper, tpl);
  }


  /**
   * Create reasons options
   */
  public getReasonsOptions(): IPhpbbFieldOption[] {
    return this.tpl.reason.map((reason) => {
      return { id: Number(reason.ID), name: reason.DESCRIPTION };
    });
  }

}

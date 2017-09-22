import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { MD_DIALOG_DATA } from '@angular/material';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { UcpPhpbbFieldComponent } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { IConfirmPopOutCustomCallback } from './../../ucp/ucp-confirm-popout/ucp-confirm-popout.component';
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit, ViewChildren, QueryList, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-sub-popout',
  templateUrl: './mcp-sub-popout.component.html',
  styleUrls: ['./mcp-sub-popout.component.css']
})
/**
 * Helper class for a sub-component that is also a pop-out for the mcp
 */
export class McpSubPopoutComponent extends PhpbbSubComponent {

  protected _callback: IConfirmPopOutCustomCallback;
  @ViewChildren(UcpPhpbbFieldComponent)
  protected _fields: QueryList<UcpPhpbbFieldComponent>;

  constructor(public formHelper: PhpbbFormHelperService, @Inject(MD_DIALOG_DATA) public tpl: IPhpbbTemplate) {
    super();
    if (this.tpl && this.tpl.callback) this._callback = this.tpl.callback;
  }

  ngOnInit() {
  }

  public confirm() {

    let confirm = this.tpl['S_CONFIRM_ACTION'];

    this.formHelper.postToPhpbbWFields(UnicodeToUtf8Pipe.HTMLEncode(this.tpl['S_CONFIRM_ACTION']), this._fields, this.tpl, {}, { redirect: false, submit: 1, confirm: "Oui" }).subscribe(
      (data) => {
        if (this._callback) this._callback.fn.call(this._callback.context, data);
        else this.formHelper.ucpOnPostCallback(data);
      }
    )

  }
}

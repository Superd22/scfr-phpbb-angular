import { PhpbbTemplateResponse } from './../../../models/phpbb-template-response';
import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { IPhpbbTemplate } from './../../../interfaces/phpbb/phpbb-tpl';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MD_DIALOG_DATA, MdDialog } from "@angular/material";
import { PhpbbFormHelperService } from '../../../services/phpbb-form-helper.service';

@Component({
  selector: 'scfr-forum-ucp-confirm-popout',
  templateUrl: './ucp-confirm-popout.component.html',
  styleUrls: ['./ucp-confirm-popout.component.scss']
})
export class UcpConfirmPopoutComponent implements OnInit {

  private _callback: IConfirmPopOutCustomCallback;

  constructor( @Inject(forwardRef(() => PhpbbFormHelperService)) public formHelper: PhpbbFormHelperService, @Inject(MD_DIALOG_DATA) public tpl: IPhpbbTemplate) {
    if (this.tpl && this.tpl.callback) this._callback = this.tpl.callback;
  }

  ngOnInit() {
  }

  public confirm() {
    this.formHelper.postToPhpbbWFieldObject(UnicodeToUtf8Pipe.HTMLEncode(this.tpl['S_CONFIRM_ACTION']), {}, this.tpl, {}, { submit: 1, confirm: "Oui" }).subscribe(
      (data) => {
        if (this._callback) this._callback.fn.call(this._callback.context, data);
        else this.formHelper.ucpOnPostCallback(data);
      }
    )

  }

}

/**
 * A custom callback to be called on completion of the pop-out
 */
export interface IConfirmPopOutCustomCallback {
  fn: (reponse?: PhpbbTemplateResponse.DefaultResponse) => void;
  context: any;
}

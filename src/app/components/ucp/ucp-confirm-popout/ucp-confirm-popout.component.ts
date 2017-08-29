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

  constructor( @Inject(forwardRef(() => PhpbbFormHelperService)) public formHelper: PhpbbFormHelperService, @Inject(MD_DIALOG_DATA) public tpl: IPhpbbTemplate) { }

  ngOnInit() {
  }

  public confirm() {
    this.formHelper.postToPhpbbWFieldObject(UnicodeToUtf8Pipe.HTMLEncode(this.tpl['S_CONFIRM_ACTION']), {}, this.tpl, {}, { submit: 1, confirm: "Oui" }).subscribe(
      (data) => {
        //this.mdDialog.closeAll();
        this.formHelper.ucpOnPostCallback(data);
      }
    )

  }

}

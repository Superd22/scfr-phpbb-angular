import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { MdDialog } from '@angular/material';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-pop-out-forgot-pwd',
  templateUrl: './pop-out-forgot-pwd.component.html',
  styleUrls: ['./pop-out-forgot-pwd.component.scss']
})
export class PopOutForgotPwdComponent implements OnInit {

  public username: string;
  public tpl: IPhpbbTemplate;
  public email: string;
  public busy = false;

  constructor(public api: PhpbbApiService, public mdDialog: MdDialog, public form: PhpbbFormHelperService) { }

  ngOnInit() {
    this.api.getPage("ucp.php?mode=sendpassword").subscribe((tpl) => this.tpl = tpl['@template']);
  }

  public newPWD() {
    this.busy = true;
    this.form.postToPhpbbWFieldObject("ucp.php?mode=sendpassword", { username: this.username, email: this.email, submit: true }, this.tpl).subscribe((data) => {
      this.api.openSnackBar(data['@template']['MESSAGE_TEXT']);
      this.busy = false;
    });
  }

  public close() {
    this.mdDialog.closeAll();
  }

}

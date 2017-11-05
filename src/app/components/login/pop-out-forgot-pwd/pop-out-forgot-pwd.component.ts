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
  public email: string;
  public busy = false;

  constructor(public api: PhpbbApiService, public mdDialog: MdDialog) { }

  ngOnInit() {
  }

  public newPWD() {
    this.busy = true;
    this.api.postPage("ucp.php?mode=sendpassword", { username: this.username, email: this.email, submit: true }).subscribe((data) => {

      this.api.openSnackBar(data['@template']['MESSAGE_TEXT']);
      
      this.busy = false;
    });
  }

  public close() {
    this.mdDialog.closeAll();
  }

}

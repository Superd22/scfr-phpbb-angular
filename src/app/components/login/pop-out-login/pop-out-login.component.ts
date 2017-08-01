import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'scfr-forum-pop-out-login',
  templateUrl: './pop-out-login.component.html',
  styleUrls: ['./pop-out-login.component.scss']
})
export class PopOutLoginComponent implements OnInit {

  public username: string;
  public password: string;
  public rememberMe: boolean = false;
  public busy = false;
  constructor(public loginService: LoginService, public mdDialog: MdDialog) {

  }

  ngOnInit() {
  }

  public login() {
    this.busy = true;
    this.loginService.loginUser(this.username, this.password, this.rememberMe);
    this.loginService.userStatus.subscribe(
      data => {
        // Login success
        if (data && data.status) this.mdDialog.closeAll();
        // Error handled by parent.
        else this.busy = false;
      }
    );
  }

}

import { UIRouter, StateService, Transition } from 'ui-router-ng2';
import { Component, OnInit, ViewContainerRef, Input } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MdSnackBar]
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public rememberMe: boolean;
  public _shouldToast: boolean;

  // State to redirect to.
  @Input() redirect: Transition;

  constructor(public LoginService: LoginService, private transition: StateService, private snackBar: MdSnackBar) {
  }

  ngOnInit() {
    this.LoginService.userStatus.subscribe(
      data => this.handleLogin(data)
    )
  }

  public loginUser(username: string, password: string, rememberMe) {
    this.LoginService.loginUser(username, password, rememberMe);
  }

  public logoutUser() {
    this.LoginService.logoutUser();
  }

  // skips the first handle with _shouldToast
  // (because app is currently initialized as userStatus: false before actually checking)
  private handleLogin(userStatus: { status: boolean, message?: string }) {
    if (this._shouldToast) {
      if (userStatus.status) {
        this.loginSuccess();
      } else {
        userStatus.message = userStatus.message || "Vous êtes bien deconnecté";
        this.loginFailed(userStatus.message);
      }
    }
    this._shouldToast = true;
  }

  private loginSuccess() {
    this.snackBar.open(`Connecté en tant que ${this.LoginService.username}`, null, { duration: 2000 });
  }

  private loginFailed(error: string) {
    if (error) {
      this.snackBar.open(error, null, { duration: 2000 });
    }
  }

}

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MdSnackBar]
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;
  public rememberMe: boolean;
  constructor(public LoginService: LoginService, private snackBar: MdSnackBar, public viewContainerRef: ViewContainerRef){}

  ngOnInit() {
    this.LoginService.userStatus.subscribe(
        data => this.handleLogin(data)
    )
  }

  public loginUser(username: string, password: string, rememberMe){
    this.LoginService.loginUser(username, password, rememberMe);
  }

  private handleLogin(userStatus: {status:boolean, message?:string}){
    if(userStatus.status){
      this.loginSuccess();
    } else {
      this.loginFailed(userStatus.message);
    }
  }
  private loginSuccess(){

  }
  private loginFailed(error: string){
    if(error){
      let snackConf = new MdSnackBarConfig(this.viewContainerRef);
      this.snackBar.open(error, null, snackConf);
    }
  }

}

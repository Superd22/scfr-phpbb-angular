import { StateTranslate } from './../../../services/state-translate.service';
import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-logged-in',
  templateUrl: './bottom-logged-in.component.html',
  styleUrls: ['./bottom-logged-in.component.scss']
})
export class BottomLoggedInComponent implements OnInit {

  public currentTpl;

  constructor(public LoginService: LoginService, private stateT: StateTranslate) { }

  ngOnInit() {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.currentTpl = tpl
    });
  }

}

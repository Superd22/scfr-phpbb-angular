import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { StateTranslate } from './../../../services/state-translate.service';
import { Transition } from 'ui-router-ng2';
import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent extends PhpbbComponent {

  constructor(phpbbapi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbapi, transition, translate)
   }

  ngOnInit() {
    super.ngOnInit();
  }

}

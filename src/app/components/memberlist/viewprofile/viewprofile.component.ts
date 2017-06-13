import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { StateTranslate } from './../../../services/state-translate.service';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { Component, OnInit } from '@angular/core';
import { PhpbbFormHelperService } from "../../../services/phpbb-form-helper.service";

@Component({
  selector: 'scfr-forum-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.scss']
})
export class ViewprofileComponent extends PhpbbComponent {

  constructor(phpbbapi: PhpbbApiService, transition: Transition, translate: StateTranslate, private formHelper: PhpbbFormHelperService) {
    super(phpbbapi, transition, translate)
  }

  ngOnInit() {
    super.ngOnInit();
    this.formHelper.handleAllOptions(this, ["S_GROUP_OPTIONS"]);
  }

}

import { Transition } from '@uirouter/angular';
import { StateTranslate } from './../../../services/state-translate.service';
import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent extends PhpbbComponent {

  constructor() {
    super()
   }

  ngOnInit() {
    super.ngOnInit();
  }

}

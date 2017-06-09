import { PhpbbApiService } from './../../services/phpbb-api.service';
import { StateTranslate } from './../../services/state-translate.service';
import { Transition } from '@uirouter/angular';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memberlist',
  templateUrl: './memberlist.component.html',
  styleUrls: ['./memberlist.component.scss']
})
export class MemberlistComponent extends PhpbbComponent {

  constructor(phpbbapi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbapi, transition, translate)
   }

  ngOnInit() {
    super.ngOnInit();
  }

}

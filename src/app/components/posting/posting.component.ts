import { StateTranslate } from './../../services/state-translate.service';
import { Transition } from 'ui-router-ng2';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})

export class PostingComponent extends PhpbbComponent {

  constructor(phpbbApi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbApi, transition, translate);
  }

  ngOnInit() {
    super.ngOnInit();
    console.log(this);
  }

}

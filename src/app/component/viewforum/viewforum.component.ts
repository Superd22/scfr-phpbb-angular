import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { StateTranslate } from './../../service/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipe/unicode-to-utf8.pipe';
import { Transition } from 'ui-router-ng2';
import { PhpbbApiService } from './../../service/phpbb-api.service';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-viewforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.scss'],
})

export class ViewforumComponent extends PhpbbComponent {

  constructor(phpbbApi: PhpbbApiService, transition: Transition, translate:StateTranslate) {
    super(phpbbApi, transition, translate);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

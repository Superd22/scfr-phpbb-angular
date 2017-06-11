import { StateTranslate } from './../../services/state-translate.service';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewonline',
  templateUrl: './viewonline.component.html',
  styleUrls: ['./viewonline.component.scss']
})
export class ViewonlineComponent extends PhpbbComponent {

  constructor(phpbbapi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbapi, transition, translate)
   }

  ngOnInit() {
    super.ngOnInit();
  }

}

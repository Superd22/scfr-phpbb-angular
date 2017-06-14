import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { OnInit } from '@angular/core';


export class PhpbbComponent implements OnInit {

  constructor(protected phpbbApi: PhpbbApiService, protected transition: Transition, protected translate:StateTranslate) {}

  ngOnInit() {
    this.translate.getCurrentStateData(this);
  }
}

import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { OnInit } from '@angular/core';


export class PhpbbComponent implements OnInit {

  constructor(private phpbbApi: PhpbbApiService, private transition: Transition, public translate:StateTranslate) {}

  ngOnInit() {
    this.translate.getCurrentStateData(this);
  }

  private unwrapTemplate(template) {
    let keyArr = Object.keys(template);

    keyArr.forEach((key) => {
      this[key] = UnicodeToUtf8Pipe.forEach(template[key]);
    });

  }

}

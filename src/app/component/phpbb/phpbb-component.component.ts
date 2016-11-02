import { StateTranslate } from './../../service/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipe/unicode-to-utf8.pipe';
import { Transition } from 'ui-router-ng2';
import { PhpbbApiService } from './../../service/phpbb-api.service';
import { OnInit } from '@angular/core';


export class PhpbbComponent implements OnInit {

  constructor(private phpbbApi: PhpbbApiService, private transition: Transition, private translate:StateTranslate) {}

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

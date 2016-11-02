import { UnicodeToUtf8Pipe } from './../../pipe/unicode-to-utf8.pipe';
import { Transition } from 'ui-router-ng2';
import { PhpbbApiService } from './../../service/phpbb-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewtopic',
  templateUrl: './viewtopic.component.html',
  styleUrls: ['./viewtopic.component.scss']
})
export class ViewtopicComponent implements OnInit {
  
  constructor(private phpbbApi: PhpbbApiService, private trans: Transition) {}

  // TO DO
  // Have phpbbresolve AND auth/access logic be handled by service
  ngOnInit() {
    if(!this.trans.params()["phpbbResolved"]) {
      // We did not inherit resolved phpbb vars.
      if(this.trans.params()["topicId"] > 0) 
      this.phpbbApi.getTopicById(this.trans.params()["topicId"]).subscribe(
        data => {
          // unwrap data for legacy template 
          this.unwrapTemplate(data['@template']);
        },
        err => console.log(err)
      );
    }
    else this.unwrapTemplate(this.trans.params()["phpbbResolved"]["@template"]);
  }

  private unwrapTemplate(template) {
    let keyArr = Object.keys(template);

    keyArr.forEach((key) => {
      this[key] = UnicodeToUtf8Pipe.forEach(template[key]);
    });

  }

}
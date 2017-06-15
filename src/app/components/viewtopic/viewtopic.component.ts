import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbService } from './../../services/phpbb.service';
import { Component, OnInit } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';

@Component({
  selector: 'app-viewtopic',
  templateUrl: './viewtopic.component.html',
  styleUrls: ['./viewtopic.component.scss'],
})

export class ViewtopicComponent extends PhpbbComponent {
  public postrow: PhpbbPostMessage[];
  public FORUM_ID: number;
  public TOPIC_ID: number;
  public CURRENT_PAGE: number;
  public S_NUM_POSTS: number;
  public PER_PAGE: number;
  public editedMessage: number = 0;

  constructor(public PhpbbService: PhpbbService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  //Will need to find a good infinite loading solution
  public loadNextPost(){
    let offset = this.CURRENT_PAGE * this.PER_PAGE;
    //We will subscribe multiple times causing dublicates this.CURRENT_PAGE++;
    //Will need to use a promise
    this.PhpbbService.getTopicById(this.TOPIC_ID, offset).subscribe(
        data => {
          this.postrow = this.postrow.concat(data);
          this.CURRENT_PAGE++;
        }
    );
  }

}

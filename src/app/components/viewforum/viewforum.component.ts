import { PHPBBViewforum } from './phpbb-viewforum.model';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-viewforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.scss'],
})

export class ViewforumComponent extends PhpbbComponent {

  /** if we're watching this forum */
  public S_WATCHING_FORUM;
  /**  */
  public U_WATCH_FORUM_LINK;
  public U_WATCH_FORUM_TOGGLE;

  constructor(phpbbApi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbApi, transition, translate);
  }

  ngOnInit() {
    super.ngOnInit();
  }


  public toggleWatchForum() {
    this.phpbbApi.getPhpbbAjaxPage(this.U_WATCH_FORUM_LINK).subscribe(
      (data) => {
        if (data.S_ERROR)
          return this.phpbbApi.errorSnackBar(data.MESSAGE_TEXT);

        this.S_WATCHING_FORUM = !this.S_WATCHING_FORUM;

        let old = this.U_WATCH_FORUM_LINK;
        this.U_WATCH_FORUM_LINK = this.U_WATCH_FORUM_TOGGLE;
        this.U_WATCH_FORUM_TOGGLE = old;

        return this.phpbbApi.openSnackBar(data.MESSAGE_TEXT);
      }
    )
  }

}

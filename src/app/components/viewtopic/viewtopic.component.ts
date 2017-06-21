import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbService } from './../../services/phpbb.service';
import { Component, OnInit } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';
import { UiServiceService } from "../../material/services/ui-service.service";

@Component({
  selector: 'app-viewtopic',
  templateUrl: './viewtopic.component.html',
  styleUrls: ['./viewtopic.component.scss'],
})

export class ViewtopicComponent extends PhpbbComponent {
  public editedMessage: number = 0;

  public fetchingNewPosts: boolean = false;

  constructor(public PhpbbService: PhpbbService, public UI: UiServiceService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public changePage(n: number) {
    this.fetchingNewPosts = true;
    this.UI.scrollToTop();
    this.stateService.go("phpbb.seo.viewtopic", { pageNumber: n });
  }

}

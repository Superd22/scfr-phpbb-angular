import { HeaderService } from './../../services/header-service.service';
import { IWPNews } from './../../interfaces/wp/wp-news.interface';
import { WpService } from './../../services/wp.service';
import { Collected, CollectorEvent } from 'ng2-rx-collector';
import { PhpbbWebsocketService } from './../../services/phpbb-websocket.service';
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

  public newPosts: number = 0;
  public news: IWPNews;


  @Collected() private collected: CollectorEvent;

  constructor(public PhpbbService: PhpbbService, public UI: UiServiceService, private ws: PhpbbWebsocketService, private wpApi: WpService, private header: HeaderService) {
    super();

  }

  ngOnInit() {
    super.ngOnInit();
    this.handleNews();
    this.ws.onReply(this.tpl.TOPIC_ID).takeUntil(this.collected).subscribe((data) => {
      this.newPosts++;
    });
  }

  /**
   * Handles the fetching and displaying of data relative to a news topic (linked to wordpress)
   */
  private handleNews() {
    // Check if we're a news topic
    if (this.tpl['TOPIC_IS_CROSSPOSTED'] && this.tpl['TOPIC_CROSSPOST_ID'] > 0) {
      // Get news data
      this.wpApi.getNewsById(this.tpl['TOPIC_CROSSPOST_ID']).subscribe((data) => {
        this.news = data;
        this.header.changeHeader(data.thumbnail, 510);
      });
    }
  }

  public get postrow() {
    if(this.displayNews) return this.tpl.postrow.slice(1);
    return this.tpl.postrow;
  }

  public get isCrossPostedNews() {
    return this.tpl['TOPIC_IS_CROSSPOSTED'] && this.tpl['TOPIC_CROSSPOST_ID'];
  }

  public get displayNews() {
    return this.isCrossPostedNews && this.news && this.tpl.CURRENT_PAGE == 1;
  }

  /**
   * Handles the logic to switch to the nth page of a topic
   * @param n the page number to switch to
   */
  public changePage(n: number) {
    this.fetchingNewPosts = true;
    this.UI.scrollToTop();
    this.stateService.go("phpbb.seo.viewtopic", { pageNumber: n });
  }

}

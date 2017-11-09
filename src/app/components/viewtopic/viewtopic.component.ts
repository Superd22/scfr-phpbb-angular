import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
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

  /** if we fetched to the latest unread post  */
  @SCFRUIParam("unread")
  private _unreadMode: boolean;

  @SCFRUIParam("p")
  private _stateTargetPost: number;

  /** the page number according to the state */
  @SCFRUIParam("pageNumber")
  private _statePageNumber: number;

  @SCFRUIParam("phpbbResolved")
  private _phpbbResolved;

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

  ngAfterViewInit() {
    this.scrollToWanted();
  }

  /**
   * Scrolls the view to whatever we wanted.
   */
  private scrollToWanted() {
    const anchor = this._unreadMode ? "unread" : (this._stateTargetPost ? "p" + this._stateTargetPost : null);

    if (anchor) {
      this.UI.scrollToAnchor(anchor);
    }
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

  /**
   * the postrow for the current view
   */
  public get postrow() {
    if (this.displayNews) return this.tpl.postrow.slice(1);
    return this.tpl.postrow;
  }

  /**
   * If we're a crossposted news topic or a normal topic
   */
  public get isCrossPostedNews(): boolean {
    return this.tpl['TOPIC_IS_CROSSPOSTED'] && this.tpl['TOPIC_CROSSPOST_ID'];
  }

  /**
   * If we should display ourselves as a news design.
   */
  public get displayNews(): boolean {
    return this.isCrossPostedNews && this.news && this.tpl.CURRENT_PAGE == 1;
  }

  /**
   * Convenience method to refresh to the latest post
   */
  public refresh() {
    this._unreadMode = true;
    // Force update
    this._phpbbResolved = false;
  }

  /**
   * Handles the logic to switch to the nth page of a topic
   * @param n the page number to switch to
   */
  public changePage(n: number) {
    if (n != this._statePageNumber && n != this.tpl.CURRENT_PAGE) {
      this.UI.scrollToTop();
      this.fetchingNewPosts = true;
      this._unreadMode = false;
      this._stateTargetPost = null;
      this._statePageNumber = n;
    }
  }

}

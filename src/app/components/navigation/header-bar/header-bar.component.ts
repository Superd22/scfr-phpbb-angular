import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { StateService } from '@uirouter/angular';
import { LayoutService } from './../../../material/services/layout-service.service';
import { StateTranslate } from './../../../services/state-translate.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scfr-forum-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {

  @Input("toggle")
  private _toggle: boolean;
  @Output()
  private toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public select: boolean = false;
  public navlinks: NavLink[] = [];
  public busy: boolean;
  public selectedForum: number;

  public pmCount;
  public notifCount;
  public loggedIn;

  public tpl: IPhpbbTemplate;

  public get toggle() {
    return this._toggle;
  }

  public set toggle(toggle: boolean) {
    this._toggle = toggle;
    this.toggleChange.emit(toggle);
  }

  constructor(private stateT: StateTranslate, private layout: LayoutService, private state: StateService) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.navlinks = tpl.navlinks
      this.tpl = tpl;

      this.loggedIn = (Number(tpl['CURRENT_USER_ID']) > 1);
      this.notifCount = Number(tpl["UNREAD_NOTIFICATIONS_COUNT"]);
      this.pmCount = Number(tpl['S_USER_NEW_PRIVMSG']);

      if (!tpl.navlinks) {
        this.selectedForum = null;
        this.navlinks = null;
      }
      else {
        this.selectedForum = this.navlinks[(this.navlinks.length - 1)].FORUM_ID;
      }
    });

    this.stateT.loading.subscribe(loading => this.busy = loading);

    this.layout.lt_sm.subscribe((lt_sm) => {
      this.select = lt_sm;
    });

  }

  public goToForum(forumId) {
    this.state.go("phpbb.seo.viewforum", { forumId: forumId, forumSlug: null, phpbbResolved:false });
  }

  ngOnInit() {
  }

}

export interface NavLink {
  FORUM_ID: number,
  FORUM_NAME: string,
  MICRODATA: string,
  S_BLOCK_NAME: string,
  S_FIRST_ROW: boolean,
  S_IS_CAT: boolean,
  S_IS_LINK: boolean,
  S_IS_POST: boolean,
  S_ROW_COUNT: number,
  S_ROW_NUM: number,
  U_VIEW_FORUM: string,
}
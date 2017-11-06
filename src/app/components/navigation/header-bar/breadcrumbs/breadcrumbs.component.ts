import { StateService } from '@uirouter/angular';
import { LayoutService } from './../../../../material/services/layout-service.service';
import { StateTranslate } from './../../../../services/state-translate.service';
import { IPhpbbTemplate } from './../../../../interfaces/phpbb/phpbb-tpl';
import { NavLink } from './../header-bar.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  
  public select: boolean = false;
  public navlinks: NavLink[] = [];
  public selectedForum: number;

  public pmCount;
  public notifCount;
  public loggedIn;

  public tpl: IPhpbbTemplate;

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


    this.layout.lt_sm.subscribe((lt_sm) => {
      this.select = lt_sm;
    });

  }

  public goToForum(forumId) {
    this.state.go("phpbb.seo.viewforum", { forumId: forumId, forumSlug: null, phpbbResolved: false });
  }

  ngOnInit() {
  }

}

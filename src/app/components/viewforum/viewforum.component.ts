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
  public sortSt;
  public sortSk;
  public sortSd;
  public loadingTopics: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }


  public toggleWatchForum() {
    this.phpbbApi.getPhpbbAjaxPage(this.tpl.U_WATCH_FORUM_LINK).subscribe(
      (data) => {
        if (data.S_ERROR)
          return this.phpbbApi.errorSnackBar(data.MESSAGE_TEXT);

        this.tpl.S_WATCHING_FORUM = !this.tpl.S_WATCHING_FORUM;

        let old = this.tpl.U_WATCH_FORUM_LINK;
        this.tpl.U_WATCH_FORUM_LINK = this.tpl.U_WATCH_FORUM_TOGGLE;
        this.tpl.U_WATCH_FORUM_TOGGLE = old;

        return this.phpbbApi.openSnackBar(data.MESSAGE_TEXT);
      }
    )
  }

  public sortPrefChanged() {
    let old = this.localSortPref;

    // Do not trigger if we don't have a value yet
    if (!this.sortSd || !this.sortSk || !this.sortSt) return;

    // Only trigger on actual change
    if (!old || old.sd != this.sortSd || old.sk != this.sortSk || old.st != this.sortSt) {
      this.updateLocalSortPref();
      this.fetchSorted();
    }

  }

  /**
   * Fetch data from phpbb and repopulate the templates
   * @todo handle optional params such as pagination
   */
  private fetchSorted() {
    // Fetch new data
    this.phpbbApi.getForumById(this.tpl.FORUM_ID).subscribe((data) => {
      // repopulate all templates
      this.translate.updateStateData(this, data);
    });
  }

  public changePage(n: number) {
    this.loadingTopics = true;
    this.stateService.go("phpbb.seo.viewforum", { pageNumber: n });
  }

  public updateLocalSortPref() {
    localStorage.setItem("forum:" + this.tpl.FORUM_ID + ":sort", JSON.stringify({
      st: this.sortSt,
      sd: this.sortSd,
      sk: this.sortSk,
      sort: "Go",
    }));
  }

  public get localSortPref(): ForumSortPref {
    return ViewforumComponent.localSortPref(this.tpl.FORUM_ID);
  }

  public static hasLocalSortPref(forumId: number): boolean {
    let t = localStorage.getItem("forum:" + forumId + ":sort");
    if (!t) return false;
    return true;
  }

  public static localSortPref(forumId: number): ForumSortPref {
    let pref = localStorage.getItem("forum:" + forumId + ":sort");
    if (pref != null) return JSON.parse(pref);
    else return { st: 0, sd: "d", sk: "t", sort: "Go" };
  }

}

export interface ForumSortPref {
  /** time for topics */
  st: 0 | 1 | 7 | 14 | 30 | 90 | 180 | 365,
  /** direction of the filter */
  sd: "a" | "d",
  /** type of sorting 
   * a : author
   * t : time (default)
   * r : reply number
   * s : subject name
   * v : views
  */
  sk: "a" | "t" | "r" | "s" | "v",
  sort: "Go",
}
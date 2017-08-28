import { IPHPBBNotif } from './notification/a-notif/a-notif.component';
import { SCMenu } from './../../enums/star-citizen.const';
import { COMMenu } from './../../enums/communaute.const';
import { IMainHeaderBarWP } from './../../interfaces/main-header-bar-wp.interface';
import { mainLinks } from './../../enums/main-links.const';
import { Component, OnInit, Input, HostListener, NgZone, EventEmitter, Output } from '@angular/core';
import { GlobalHeaderService } from "app/header/services/global-header.service";

@Component({
  selector: 'scfr-forum-global-header-bar',
  templateUrl: './global-header-bar.component.html',
  styleUrls: ['./global-header-bar.component.scss']
})
export class GlobalHeaderBarComponent implements OnInit {

  public topLinks = mainLinks;
  public WPHeader: IMainHeaderBarWP;
  @Input()
  public displayLogo: boolean = true;
  @Output("toggled")
  private _toggleChange = new EventEmitter<boolean>();
  public set toggleMenu(toggle: boolean) { this._toggleChange.emit(toggle); }


  @Input()
  public displayEvents: boolean = true;

  /** Forum TPL for no need to fetch again */
  @Input()
  public tpl;

  public SCM = SCMenu;
  public COM = COMMenu;

  private _scrollTop = 0;


  constructor(private api: GlobalHeaderService, private ngZone: NgZone) {
    this.api.getHeaderData().subscribe((wpHeader) => {
      this.WPHeader = wpHeader;
    });

    this.api.setForumTpl(this.tpl);
  }

  ngOnInit() {
    window.addEventListener('scroll', this._onScroll, true);
  }

  public get loggedIn(): boolean { return this.api.loggedIn }
  public get notificationCount(): number { return this.api.notificationCount }
  public get pmCount(): number { return this.api.pmCount; }
  public get notifications(): IPHPBBNotif[] { return this.api.notifications; }
  public get markNotificationRead(): string { return this.api.markNotificationRead; }

  private _onScroll = () => {
    let material = document.getElementsByClassName('mat-sidenav-content');
    let scrollAmount = window.scrollY;
    if (material && material[0]) scrollAmount = material[0].scrollTop;

    if (this.ngZone)
      this.ngZone.run(() => this._scrollTop = scrollAmount);
  }

  public get scrollTop(): string { return this._scrollTop + "px"; }

  public get fixed(): boolean { return this._scrollTop > 64; }

  public get marginTop(): string {
    let margin = 0;
    margin = this._scrollTop <= margin ? this._scrollTop : margin;

    return margin + "px";
  }

  public get hasPm() { return this.pmCount > 0; }
  public get hasNotification() { return this.notificationCount > 0; }

  public markAllNotificationRead() {

  }


}

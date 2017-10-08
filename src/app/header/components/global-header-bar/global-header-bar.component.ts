import { IPHPBBNotif } from './notification/a-notif/a-notif.component';
import { SCMenu } from './../../enums/star-citizen.const';
import { COMMenu } from './../../enums/communaute.const';
import { IMainHeaderBarWP } from './../../interfaces/main-header-bar-wp.interface';
import { mainLinks } from './../../enums/main-links.const';
import {Component, OnInit, Input, HostListener, NgZone, EventEmitter, Output, OnChanges} from '@angular/core';
import { GlobalHeaderService } from 'app/header/services/global-header.service';

@Component({
  selector: 'scfr-global-header-bar',
  templateUrl: './global-header-bar.component.html',
  styleUrls: ['./global-header-bar.component.scss']
})
export class GlobalHeaderBarComponent implements OnInit, OnChanges {

  public topLinks = mainLinks;
  public WPHeader: IMainHeaderBarWP;

  @Output()
  private toggleNav = new EventEmitter<boolean>();

  @Input()
  public displayEvents: boolean = true;

  /** Forum TPL for no need to fetch again */
  @Input()
  public tpl;

  @Input('env')
  public envUrl;

  public SCM = SCMenu;
  public COM = COMMenu;

  private _scrollTop = 0;


  constructor(
      private api: GlobalHeaderService,
      private ngZone: NgZone,
  ) {}

  ngOnChanges() {
    this.api.setForumTpl(this.tpl);
  }

  ngOnInit() {
    this.api.getHeaderData().subscribe((wpHeader) => {
      this.WPHeader = wpHeader;
    });

    this.api.setForumTpl(this.tpl);
    window.addEventListener('scroll', this._onScroll, true);
  }

  public toggleMenu() { this.toggleNav.emit(); }
  public get loggedIn(): boolean { return this.api.loggedIn }
  public get notificationCount(): number { return this.api.notificationCount }
  public get pmCount(): number { return this.api.pmCount; }
  public get notifications(): IPHPBBNotif[] { return this.api.notifications; }
  public get markNotificationRead(): string { return this.api.markNotificationRead; }
  public get hasPm() { return this.pmCount > 0; }
  public get hasNotification() { return this.notificationCount > 0; }
  public togglePrimaryNavigation() {this.api.toggleMobileNavigation();}
  public get mobileNavToggled() {return this.api.getMobileNavigation();}

  private _onScroll = () => {
    let material = document.getElementsByClassName('mat-sidenav-content');
    let scrollAmount = window.scrollY;
    if (material && material[0]) scrollAmount = material[0].scrollTop;

    if (this.ngZone)
      this.ngZone.run(() => this._scrollTop = scrollAmount);
  }

  public get scrollTop(): string { return this._scrollTop + 'px'; }

  public get fixed(): boolean { return this._scrollTop > 64; }

  public get marginTop(): string {
    let margin = 0;
    margin = this._scrollTop <= margin ? this._scrollTop : margin;

    return margin + 'px';
  }

  public markAllNotificationRead() {

  }


}

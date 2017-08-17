import { SCMenu } from './../../enums/star-citizen.const';
import { COMMenu } from './../../enums/communaute.const';
import { IMainHeaderBarWP } from './../../interfaces/main-header-bar-wp.interface';
import { mainLinks } from './../../enums/main-links.const';
import { Component, OnInit, Input, HostListener, NgZone } from '@angular/core';
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
  public SCM = SCMenu;
  public COM = COMMenu;

  private _scrollTop = 0;


  constructor(private api: GlobalHeaderService, private ngZone: NgZone) {
    this.api.getHeaderData().subscribe((wpHeader) => {
      this.WPHeader = wpHeader;
    });
  }

  ngOnInit() {
    window.addEventListener('scroll', this._onScroll, true);
  }


  private _onScroll = () => {
    let material = document.getElementsByClassName('mat-sidenav-content');
    let scrollAmount = window.scrollY;
    if (material && material[0]) scrollAmount = material[0].scrollTop;

    console.log(this);

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
}

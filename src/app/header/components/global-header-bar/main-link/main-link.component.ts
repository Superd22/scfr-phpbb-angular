import { GlobalHeaderService } from './../../../services/global-header.service';
import { IMainNavLink } from './../../../interfaces/main-nav-link.interface';
import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'scfr-forum-main-link',
  templateUrl: './main-link.component.html',
  styleUrls: ['./main-link.component.scss']
})
export class MainLinkComponent implements OnInit {

  @Input()
  public link: IMainNavLink
  public openMenu: boolean = false;
  public leftOffset: string = "0px";


  constructor(private elRef: ElementRef, public api: GlobalHeaderService) { }

  ngOnInit() {

  }

  @HostListener('mouseenter')
  protected onMouseEnter() {
    this.openMenu = true;
    this.getLeftOffset();
  }

  @HostListener('mouseleave')
  protected onMouseLeave() {
    this.openMenu = false;
  }

  /**
   * Check if this button has a small menu
   */
  public get isSmallMenu(): boolean {
    return this.link.menuType == "small";
  }

  /**
   * Check if this button has a menu
   */
  public get hasMenu(): boolean {
    return this.link.menuType != "none";
  }

  /**
   * Get the offset to the left for the current menu to display the sub-menu at the correct
   * position.
   */
  public getLeftOffset(): void {
    let rect = this.elRef.nativeElement.getBoundingClientRect();
    this.leftOffset = rect.left + "px";
  }

  /**
   * If we should display this link or not
   */
  public get shouldDisplay(): boolean {
    return this.link.julietOnly ? this.api.isJuliet : true;
  }

}

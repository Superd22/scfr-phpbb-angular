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


  constructor(private elRef: ElementRef) { }

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

  public get isSmallMenu(): boolean {
    return this.link.menuType == "small";
  }

  public get hasMenu(): boolean {
    return this.link.menuType != "none";
  }

  public getLeftOffset(): void {
    let rect = this.elRef.nativeElement.getBoundingClientRect();
    this.leftOffset = rect.left + "px";
  }
  
}

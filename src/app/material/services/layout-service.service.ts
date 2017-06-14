import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";

@Injectable()
export class LayoutService {

  private _xs: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _sm: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _md: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _lg: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _xl: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private _lt_sm: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _lt_md: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _lt_lg: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _lt_xl: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private _gt_xs: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _gt_sm: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _gt_md: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _gt_lg: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);


  public get xs() { return this._xs; }
  public get sm() { return this._sm; }
  public get md() { return this._md; }
  public get lg() { return this._lg; }
  public get xl() { return this._xl; }
  
  public get lt_sm() { return this._lt_sm; }
  public get lt_md() { return this._lt_md; }
  public get lt_lg() { return this._lt_lg; }
  public get lt_xl() { return this._lt_xl; }

  public get gt_xs() { return this._gt_xs; }
  public get gt_sm() { return this._gt_sm; }
  public get gt_md() { return this._gt_md; }
  public get gt_lg() { return this._gt_lg; }


  constructor() {
    setTimeout(() => this.handleRsized(this.getWindowWidth()));
    Observable.fromEvent(window, 'resize').map(() => this.getWindowWidth()).subscribe((size) => this.handleRsized(size));
  }

  private handleRsized(windowWidth: number) {
    let Bks = this.calcBreakPoints(windowWidth);
    let AllBks: ResponsiveBreakPoint[] = ["lt_sm", "lt_md", "lt_lg", "lt_xl", "xs", "sm", "md", "lg", "xl", "gt_xs", "gt_sm", "gt_md", "gt_lg"]

    AllBks.forEach((bk) => {
      if (Bks.indexOf(bk) == -1) {
        this.emitIn(bk, false);
      }
    });

    Bks.forEach((bk) => {
      this.emitIn(bk, true);
    });

  }

  private calcBreakPoints(windowWidth: number): ResponsiveBreakPoint[] {
    let Bks: ResponsiveBreakPoint[] = [];

    if (windowWidth < 599) {
      Bks.push("xs", "lt_sm");
    }

    if (windowWidth < 959) {
      Bks.push("lt_md");
      if (windowWidth > 600) Bks.push("sm");
    }

    if (windowWidth < 1279) {
      Bks.push("lt_lg");
      if (windowWidth > 960) Bks.push("md");
    }

    if (windowWidth < 1919) {
      Bks.push("lt_xl");
      if (windowWidth > 1280) Bks.push("lg");
    }

    if (windowWidth > 1920) {
      Bks.push("gt_lg");
      if (windowWidth < 5000) Bks.push("xl");
    }

    if (windowWidth > 1280) Bks.push("gt_md");
    if (windowWidth > 960) Bks.push("gt_sm");
    if (windowWidth > 600) Bks.push("gt_xs");

    return Bks;
  }

  private emitIn(target: ResponsiveBreakPoint, emit: boolean) {
    let em: ReplaySubject<boolean> = this["_" + target];
    em.next(emit);
  }

  public getWindowWidth() {
    return window.innerWidth;
  }

}

export type ResponsiveBreakPoint =
  "lt_sm" |
  "lt_md" |
  "lt_lg" |
  "lt_xl" |
  "xs" |
  "sm" |
  "md" |
  "lg" |
  "xl" |
  "gt_xs" |
  "gt_sm" |
  "gt_md" |
  "gt_lg"

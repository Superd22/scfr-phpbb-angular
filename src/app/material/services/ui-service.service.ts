import { Injectable } from '@angular/core';

@Injectable()
export class UiServiceService {

  private _container: Element = null;

  constructor() { }

  /**
   * Jumps the page to a given anchor
   * This *will* potentially cause a state change, be careful.
   * If you want to avoid a state change, use @see scrollToAnchor instead
   * @param anchor the id of the element to jump to.
   */
  public jumpToAnchor(anchor: string) {
    window.location.hash = "";
    window.location.hash = anchor;
  }

  /**
   * Scroll the main container of the app to a given value
   * @param y the value from the top to scroll to (in px)
   */
  public scrollToY(y: number) {
    this.container.scrollTop = y;
  }

  /**
   * Scroll the main container of the app to the top
   */
  public scrollToTop() {
    this.scrollToY(0);
  }

  /**
   * @todo
   */
  public scrollToAnchor(string: number) {

  }


  private get container(): Element {
    if (!this._container) {
      this._container = document.getElementsByClassName("mat-sidenav-content")[0];
    }

    if (!this._container) throw "COULDN'T GET SIDENAV CONTAINER";

    return this._container;
  }


}

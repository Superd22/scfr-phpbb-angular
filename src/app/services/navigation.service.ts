import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from 'environments/environment';

@Injectable()
export class NavigationService {
  /**
   * Sidenav open/closed
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  protected _sidenavToggled: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * Sidenav mode
   * @type {BehaviorSubject<string>}
   * @private
   */
  protected _sidenavMode: BehaviorSubject<string> = new BehaviorSubject('over');
  /**
   * Main Navigation in the sidenav (Mobile)
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  protected _sidenavMainNavigationToggled: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * Desktop/Mobile menu
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  protected _mobileMenu: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor() { }

  get sidenavToggled(): BehaviorSubject<boolean> {
    return this._sidenavToggled;
  }

  get sidenavMode(): BehaviorSubject<string> {
    return this._sidenavMode;
  }

  get sidenavMainNavigationToggled(): BehaviorSubject<boolean> {
    return this._sidenavMainNavigationToggled;
  }

  get mobileMenu(): BehaviorSubject<boolean> {
    return this._mobileMenu;
  }

  toggleSidenav(){
    if(!environment.production) console.log('Toggle Sidenav '+!this._sidenavToggled.value);
    this._sidenavToggled.next(!this._sidenavToggled.value);
  }

  setSidenavToggled(value: boolean) {
    if(!environment.production) console.log('Set Sidenav '+ value);
    this._sidenavToggled.next(value);
  }

  toggleSidenavMainNavigation() {
    if(!environment.production) console.log('Toogle Sidenav :'+ !this._sidenavMainNavigationToggled.value);
    this._sidenavMainNavigationToggled.next(!this._sidenavMainNavigationToggled.value);
  }

  setSidenavMode(value: string) {
    if(!environment.production) console.log('Set Sidenav Mode :'+ value);
    this._sidenavMode.next(value);
  }

  setMobileMenu(value: boolean) {
    if(!environment.production) console.log('Set Mobile Menu:'+ value);
    this._mobileMenu.next(value);
  }


}

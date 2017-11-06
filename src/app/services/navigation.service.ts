import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { SCFRLocalStorage } from '../decorators/LocalStorage.decorator';

@Injectable()
export class NavigationService {
  /**
   * Storage status of the sidenav
   */
  @SCFRLocalStorage('navbar:toggle')
  protected _sidenavPreference: boolean;
  /**
   * Sidenav open/closed
   * @type {BehaviorSubject<boolean>}
   * @private
   */
  protected _sidenavToggled: BehaviorSubject<boolean> = new BehaviorSubject(this._sidenavPreference);
  /**
   * Sidenav mode
   * @type {BehaviorSubject<string>}
   * @private
   */
  protected _sidenavMode: BehaviorSubject<NavBarSupportedMode> = new BehaviorSubject<NavBarSupportedMode>('side');
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

  /**
   * if the sidenav is displaying in mobile mode
   */
  get sidenavIsMobileMod() {
    return this.sidenavMode.getValue() === "over";
  }

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

  toggleSidenav() {
    if (!environment.production) console.log('Toggle Sidenav ' + !this._sidenavToggled.value);
    this._sidenavPreference = !this._sidenavToggled.value;
    this._sidenavToggled.next(!this._sidenavToggled.value);
  }

  setSidenavToggled(value: boolean) {
    if (!environment.production) console.log('Set Sidenav ' + value);
    this._sidenavToggled.next(value);
    this._sidenavPreference = value;
  }

  toggleSidenavMainNavigation() {
    if (!environment.production) console.log('Toogle Sidenav :' + !this._sidenavMainNavigationToggled.value);
    this._sidenavMainNavigationToggled.next(!this._sidenavMainNavigationToggled.value);
  }

  setSidenavMode(value: NavBarSupportedMode) {
    if (!environment.production) console.log('Set Sidenav Mode :' + value);
    this._sidenavMode.next(value);
  }

  setMobileMenu(value: boolean) {
    if (!environment.production) console.log('Set Mobile Menu:' + value);
    this._mobileMenu.next(value);
  }


}


/** describe the mode of navbars supported by the app */
export type NavBarSupportedMode = "over" | "side";
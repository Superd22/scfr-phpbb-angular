import { ServiceLocator } from './../../../services/ServiceLocator';
import { LanguageProviderService } from './../../services/language-provider.service';
import { OnInit } from '@angular/core';

/**
 * Base classe for a component which wants to have direct access to PHPBB simulated language system
 */
export class PhpbbLanguageComponent implements OnInit {
  protected _language_service: LanguageProviderService;

  /**
   * Might hold something
   */
  public tpl;

  /**
   * Holds the appopriate language data for the current user.
   */
  public L_: any = new Proxy({}, {
    /**
     * Automagically catch every get call the child component will do on its own members
     * and replaces them with Language content if available.
     */
    get: (target, prop: string) => {
      let returnString = "";

      if (this[prop]) return this[prop];
      if (this['tpl'] && this["tpl"][prop]) returnString = this["tpl"][prop];
      if (this['tpl'] && this["tpl"]["L_" + prop]) returnString = this["tpl"]["L_" + prop];

      return this._language_service.getTranslation(prop) || returnString;
    }
  });

  constructor() {
    // Do language on our own so we don't blot the super() calls
    this._language_service = ServiceLocator.injector.get(LanguageProviderService);

    //return new Proxy(this, this);
  }

  ngOnInit() {
  }

}

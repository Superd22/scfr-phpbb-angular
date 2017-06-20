import { ServiceLocator } from './../../../services/ServiceLocator';
import { LanguageProviderService } from './../../services/language-provider.service';
import { OnInit } from '@angular/core';

/**
 * Base classe for a component which wants to have direct access to PHPBB simulated language system
 */
export class PhpbbLanguageComponent implements OnInit {
  protected _language_service: LanguageProviderService;

  constructor() {
    // Do language on our own so we don't blot the super() calls
    this._language_service = ServiceLocator.injector.get(LanguageProviderService);
    
    return new Proxy(this, this);
  }

  ngOnInit() {
  }

  /**
   * Automagically catch every get call the child component will do on its own members
   * and replaces them with Language content if available.
   */
  get(target, prop: string): any {
    if (this[prop] != undefined) return this[prop];
    if (prop.indexOf("L_") === 0) return this._language_service.getTranslation(prop);
  }

}

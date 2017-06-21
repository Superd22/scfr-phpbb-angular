import { FRCommonLanguage } from './../languages/common.enum';
import { UCPLanguage } from './../languages/ucp.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageProviderService {

  private _langUCP = UCPLanguage;
  private _langCommon = FRCommonLanguage;

  private _lang;

  /**
   * @todo handle multi lang
   */
  constructor() {
    this._lang = Object.assign({}, this._langCommon, this._langUCP);
  }


  /**
   * Return a matching translated string for the key
   * @param key the name to search for, with the L_ prefix
   */
  public getTranslation(key: string): string {
    return this._lang[key];
  }



}

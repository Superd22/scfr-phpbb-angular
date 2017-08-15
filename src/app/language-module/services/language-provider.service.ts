import { FRPostingLanguage } from './../languages/posting.enum';
import { FRMemberListLanguage } from './../languages/memberlist.enum';
import { FRCommonLanguage } from './../languages/common.enum';
import { UCPLanguage } from './../languages/ucp.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageProviderService {

  private _lang;

  /**
   * @todo handle multi lang
   */
  constructor() {
    this._lang = Object.assign({}, FRCommonLanguage, UCPLanguage, FRMemberListLanguage, FRPostingLanguage);
  }


  /**
   * Return a matching translated string for the key
   * @param key the name to search for, with the L_ prefix
   */
  public getTranslation(key: string): string {
    return this._lang[key];
  }



}

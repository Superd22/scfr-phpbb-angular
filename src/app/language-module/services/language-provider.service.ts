import { UCPLanguage } from './../languages/ucp.enum';
import { Injectable } from '@angular/core';

@Injectable()
export class LanguageProviderService {

  private _langUCP = UCPLanguage;

  constructor() { 
  }


  public L_(param: string) {
    if(param && this._langUCP && this._langUCP[param])
    return this._langUCP[param];
    return null;
  }

  /**
   * Helper function to automatically 
   */
  public autoGetLs(component) {

  }

}

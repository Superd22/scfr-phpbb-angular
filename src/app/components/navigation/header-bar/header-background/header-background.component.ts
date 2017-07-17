import { DomSanitizer, SafeStyle } from '@angular/platform-browser/';
import { StateTranslate } from './../../../../services/state-translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-header-background',
  templateUrl: './header-background.component.html',
  styleUrls: ['./header-background.component.scss']
})
export class HeaderBackgroundComponent implements OnInit {

  private _customForum: string = null;
  private _userSelected: number = 0;

  constructor(private stateT: StateTranslate, private sanitizer: DomSanitizer) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      if (tpl['S_JU_BAN']) {
        this._customForum = tpl['S_JU_BAN'];
      }
      else {
        this._customForum = null;
        this._userSelected = tpl['PROFILE_CUSTOM_BG_VALUE'];
      }

      console.log(this, this.headerImage);
    });
  }

  ngOnInit() {
  }

  public get headerImage(): string {
    let ret = "";

    if (this._customForum) ret = this._customForum;
    else ret = "./assets/images/headers/" + this._userSelected + ".jpg";

    return ret;
  }
}

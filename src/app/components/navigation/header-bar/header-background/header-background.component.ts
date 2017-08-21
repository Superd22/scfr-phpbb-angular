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
  public forceHeight: number = 0;
  public guildMod: boolean = false;
  public customMod: boolean = false;

  public youtube;
  public twitch;

  constructor(private stateT: StateTranslate, private sanitizer: DomSanitizer) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.guildMod = this.customMod = false;

      if (tpl['BAN_HEIGHT']) this.forceHeight = Number(tpl['BAN_HEIGHT']);
      else this.forceHeight = 0;


      if (tpl['CUSTOM_BANNER']) {
        this._customForum = tpl['CUSTOM_BANNER'];
        this.customMod = true;
      }
      else if (tpl['GUILD_BANNER']) {
        this._customForum = tpl['GUILD_BANNER'];
        this.guildMod = true;
      }
      else if (tpl['S_JU_BAN']) {
        this._customForum = tpl['S_JU_BAN'];
      }
      else {
        this._customForum = null;
        this._userSelected = tpl['PROFILE_CUSTOM_BG_VALUE'];
      }
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

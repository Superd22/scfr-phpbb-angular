import { IPhpbbTemplate } from './../../../../interfaces/phpbb/phpbb-tpl';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser/';
import { StateTranslate } from './../../../../services/state-translate.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'scfr-forum-header-background',
  templateUrl: './header-background.component.html',
  styleUrls: ['./header-background.component.scss']
})
export class HeaderBackgroundComponent implements OnInit {

  /** the custom forum specific image to display */
  private _customForum: string = null;
  /** the user selected main image to display */
  private _userSelected: number = 0;
  /** the height in px we want to force */
  public forceHeight: number = 0;
  /** if we're displaying a guild image */
  public guildMod: boolean = false;
  /** if we're displaying a custom image */
  public customMod: boolean = false;
  /** the previous image we displayed */
  public prevImage: string = null;

  /** transition time between images in seconds */
  public transitionTime = 1.5;

  /** youtube video currently displayed */
  public youtube;
  /** twitch video currently displayed */
  public twitch;

  @ViewChild("imageTransition")
  private _imageTransition: ElementRef;

  constructor(private stateT: StateTranslate, private sanitizer: DomSanitizer, private _element: ElementRef) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.computeNextBanner(tpl);
      this.handleTransition();
    });
  }

  ngOnInit() {
  }

  /**
   * Given a tpl, computes what the banner to display is
   * 
   * @param tpl the phpbb template for the current page 
   */
  private computeNextBanner(tpl: IPhpbbTemplate) {
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
  }

  /**
   * If needed, performs the transition between two images
   */
  private handleTransition() {
    this._imageTransition.nativeElement.classList.remove('transition');

    // We need to do a transition
    if (this.prevImage != this.headerImage) {
      // Load our image
      let nextImage = new Image();
      nextImage.src = this.headerImage;

      // When we're loaded, we launch the transition
      nextImage.addEventListener("load", () => {
        this._imageTransition.nativeElement.style.backgroundImage = "url(" + nextImage.src + ")";
        this._imageTransition.nativeElement.classList.add('transition');

        setTimeout(() => {
          this.prevImage = this.headerImage;
        }, (this.transitionTime * 1000)/2);

        // gc
        nextImage = null;
      });

    }
  }

  /**
   * The appropriate header image to display given the mod we're in
   */
  public get headerImage(): string {
    let ret = "";

    if (this._customForum) ret = this._customForum;
    else ret = "./assets/images/headers/" + this._userSelected + ".jpg";

    return ret;
  }

  public get isTransition(): boolean {
    return this.prevImage != this.headerImage;
  }
}

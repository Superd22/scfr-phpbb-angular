import { IPhpbbTemplate } from './../../../../interfaces/phpbb/phpbb-tpl';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser/';
import { StateTranslate } from './../../../../services/state-translate.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import YouTubePlayer from 'youtube-player';
import 'twitch-embed';

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
  public _youtube;
  /** twitch video currently displayed */
  private _twitch;
  /** our twitch player object */
  private _twitchPlayer;
  /** the latest twitch having been loaded */
  private _lastTwitchLoaded: string = null;
  /** the youtube player */
  private _ytPlayer;
  /** the latest yt video having been loaded */
  private _lastYtLoaded: string = null;

  /** youtube id that we want to display */
  public get youtube(): string { return this._youtube; }
  /** twitch id that we want to display */
  public get twitch(): string { return this._twitch; }
  public set youtube(yt: string) { this._twitch = false; this._youtube = yt; }
  public set twitch(tw: string) { this._twitch = tw; this._youtube = false; }

  public set customImage(image: string) { this._customForum = image; this.youtube = null; }

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


    if (tpl['TWITCH_BANNER']) {
      if(!this.forceHeight) this.forceHeight = 400;
      this.twitch = tpl['TWITCH_BANNER'];
    }
    else if (tpl['YOUTUBE_BANNER']) {
      if(!this.forceHeight) this.forceHeight = 400;
      this.youtube = tpl['YOUTUBE_BANNER'];
    }
    else if (tpl['CUSTOM_BANNER']) {
      this.customImage = tpl['CUSTOM_BANNER'];
      this.customMod = true;
    }
    else if (tpl['GUILD_BANNER']) {
      this.customImage = tpl['GUILD_BANNER'];
      this.guildMod = true;
    }
    else if (tpl['S_JU_BAN']) {
      this.customImage = tpl['S_JU_BAN'];
    }
    else {
      this.customImage = null;
      this._userSelected = tpl['PROFILE_CUSTOM_BG_VALUE'];
    }

    if (!this.youtube) {
      this._ytPlayer = null;
      this._lastYtLoaded = null;
    }

    if (!this.twitch) {
      this._twitchPlayer = null;
      this._lastTwitchLoaded = null;
    }

    if (this.twitch) {
      setTimeout(() => this.doTwitch());
    }


    if (this.youtube) {
      setTimeout(() => this.doYoutube());
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
        }, (this.transitionTime * 1000) / 2);

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

  public doTwitch() {
    // Handle the changing of a video when the player is already there
    if (this._lastTwitchLoaded !== this.twitch && this._twitchPlayer) {
      this._lastTwitchLoaded = this.twitch;
      this._twitchPlayer.setChannel(this.twitch);
      this._twitchPlayer.setMuted(true);
    }
    // handles the creation of the twitch thingy if we need to
    else if (this._lastTwitchLoaded !== this.twitch) {

      // Create the thingy if we have to
      const twitch = this.twitch;
      this._twitchPlayer = new (<any>window).Twitch.Player("twitchplayer",
        {
          channel: twitch,
          height: 1024,
          width: 1980,
        }
      );
      this._lastTwitchLoaded = this.twitch;

      // Mute the damn thing
      this._twitchPlayer.setMuted(true);
    }

  }

  /**
   * Creates the youtube thingy
   */
  public doYoutube() {
    // Handle the changing of a video when the player is already there
    if (this._lastYtLoaded !== this.youtube && this._ytPlayer) {
      this._lastYtLoaded = this.youtube;
      this._ytPlayer.loadVideoById(this.youtube);
      this._ytPlayer.mute();
    }
    // Make sure we're changing video if we have to
    else if (this._lastYtLoaded !== this.youtube) {

      // Create the thingy if we have to
      this._ytPlayer = YouTubePlayer("ytplayer", {
        videoId: this.youtube,
        playerVars: {
          'autoplay': 1,
          'rel': 0,
          'showinfo': 0,
          'egm': 0,
          'showsearch': 0,
          'controls': 1,
          'modestbranding': 1,
          'loop': 1,
          'iv_load_policy': 3,
          'playlist': this.youtube
        },
      });

      this._lastYtLoaded = this.youtube;


      // Mute the damn thing
      this._ytPlayer.mute();
    }

  }
}

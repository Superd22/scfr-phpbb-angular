import { StateTranslate } from './state-translate.service';
import { Injectable } from '@angular/core';

@Injectable()
export class HeaderService {

  constructor(private stateT: StateTranslate) { }

  /**
   * Change the header for the whole app
   * 
   * @param image the url of the image
   * @param height the height of the header
   */
  public changeHeader(image: string, height?: number) {
    let tpl = {
      GUILD_BANNER: image
    };

    if (height && height > 0) tpl['BAN_HEIGHT'] = height;

    this.stateT.assignNewTemplateData(tpl);
  }

  /**
   * Sets a youtube video as header for the whole app
   */
  public setHeaderYoutube(youtubeId: string) {
    let tpl = {
      YOUTUBE_BANNER: youtubeId,
      TWITCH_BANNER:false,
    };

    this.stateT.assignNewTemplateData(tpl);
  }

  /**
   * Sets a twitch video as header for the whole app
   */
  public setHeaderTwitch(twitchId: string) {
    let tpl = {
      TWITCH_BANNER: twitchId,
    };

    this.stateT.assignNewTemplateData(tpl);
  }
}

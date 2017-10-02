import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { StateTranslate } from './../../services/state-translate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-background',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  public customBackground;
  public customBackgroundType: "video" | "img" = "video";
  public nextCustomBackground;
  public nextCustomBackgroundType: "video" | "img" = "video";

  public get nextImageCss(): string { return "url(" + this.nextCustomBackground + ")"; }

  constructor(protected stateT: StateTranslate) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.computeNextBackground(tpl);
      this.handleTransition();
    });

  }

  ngOnInit() {
  }

  private computeNextBackground(tpl: IPhpbbTemplate) {
    if (tpl['CUSTOM_BACKGROUND']) {
      this.nextCustomBackground = tpl['CUSTOM_BACKGROUND'];
      this.nextCustomBackgroundType = "img";
    }
    else this.resetBg();
  }

  private resetBg() {
    this.customBackground = null;
    this.customBackgroundType = "video";
    this.nextCustomBackground = null;
    this.nextCustomBackgroundType = "video";
  }

  private handleTransition() {
    // Transition needed
    if (this.customBackground != this.nextCustomBackground) {
      if (this.nextCustomBackgroundType == "img") return this.imageTransition();

    }
  }

  private imageTransition() {
    // Load our image
    let nextImage = new Image();
    nextImage.src = this.nextCustomBackground;

    // When we're loaded, we launch the transition
    nextImage.addEventListener("load", () => {
      this.customBackground = this.nextCustomBackground;
      this.customBackgroundType = this.nextCustomBackgroundType;
    });
  }
}

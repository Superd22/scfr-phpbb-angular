import { Directive, HostBinding, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[scfrForumImageHeaderFit]'
})

export class ImageHeaderFitDirective {

  @HostBinding('style.background-size')
  private _bg = "contain";

  @HostListener('window:resize')
  onResize() {
    this.run();
  }


  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.run();
  }

  public async run() {
    let image = await this.getImage();
    let container = this.getHeaderContainer();

    if(image.width >= container.width) this._bg = "auto "+container.height+"px";
    else this._bg = "cover";
  }

  protected getHeaderContainer() {
    return this.elRef.nativeElement.getBoundingClientRect();
  }

  protected async getImage() {
    let imageSrc = this.elRef.nativeElement.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    
    let image = new Image();
    image.src = imageSrc;

    return await new Promise<HTMLImageElement>(
      (resolve) => {
        image.addEventListener("load", (event) => {
          let width = image.width;
          let height = image.height;

          resolve(image);
        });
      });
  }
}

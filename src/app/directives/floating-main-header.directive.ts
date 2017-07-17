import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[scfrForumFloatingMainHeader]'
})

/**
 * Directive to "float" an element into the main header between the global nav and the secondary nav.
 */
export class FloatingMainHeaderDirective {

  @HostBinding('style.margin-top')
  private _marginTop;

  @HostBinding('style.margin-bottom')
  private _marginBottom;

  @HostBinding('style.position')
  private _position = "relative";
  @HostListener('window:resize')
  onResize() {
    this.run();
  }

  private _offset = 64;

  constructor(private elRef: ElementRef) { }

  ngAfterViewInit() {
    this.run();
  }



  protected run() {
    this.findMainHeader();
    this.doAlign();
  }

  protected findMainHeader() {
    let header = document.getElementById("main-header-image");
    if (!header) throw "[scfrForumFloatingMainHeader] Can't find main header image";
  }

  protected doAlign() {
    let rect = this.elRef.nativeElement.getBoundingClientRect();
    let move = rect.height + this._offset;

    this.marginTop = - move;
    this.marginBottom = this._offset;
  }

  public set marginTop(top: number) {
    this._marginTop = this.addPx(top);
  }

  public set marginBottom(bottom: number) {
    this._marginBottom = this.addPx(bottom);
  }

  protected addPx(number: number): string {
    return String(number) + "px";
  }
}

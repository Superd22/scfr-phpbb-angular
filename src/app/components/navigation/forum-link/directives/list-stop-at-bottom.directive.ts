import { ForumLinkComponent } from './../forum-link.component';
import { Directive, ElementRef, ViewContainerRef, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

/**
 * Helper directive for left-navbar subforums, will resize a left-most vertical bar (for the linked-list)
 * to its right size
 */

@Directive({
  selector: '[scfrForumListStopAtBottom]'
})
export class ListStopAtBottomDirective implements OnInit, OnChanges {


  protected _component: ForumLinkComponent;
  @Input()
  protected scfrForumListStopAtBottom: boolean;

  protected inited: boolean = false;

  protected _baseHeight = 40;
  protected _basSkew = 5;
  protected _baseCorrect = 3;

  constructor(protected _element: ElementRef) {

  }

  ngOnInit() {
    this.inited = true;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (this.inited)
      if (changes.scfrForumListStopAtBottom !== undefined) setTimeout(() => this.computeBeforeHeight());
  }

  /**
   * Computes the height of the border-left for a sub-forum container
   */
  private computeBeforeHeight() {

    let e: Element = this._element.nativeElement;
    let leftborder = e.querySelectorAll(".leftborder");

    // We don't have any children 
    if(e.childElementCount <= 1) return;

    // If we found our left border
    if (leftborder && leftborder[0]) {

      /** 
       * Get the last element in the list, remove its height (in case it's expended)
       * and then add a standard height of closed sub-forum
       */
      let last = e.lastElementChild;
      let lastHeight = last.getBoundingClientRect().height;
      let newHeight = e.getBoundingClientRect().height - lastHeight;
      newHeight += this._baseHeight - (this._basSkew + this._baseCorrect);

      // this is because on start-up we'd set everything to 32px
      if (newHeight > this._baseHeight)
        leftborder[0].setAttribute('style', 'height: ' + newHeight + 'px;')
    }

  }

}

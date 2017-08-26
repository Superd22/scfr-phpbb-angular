import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[scfrForumMessageDecoBalls]'
})
export class MessageDecoBallsDirective implements OnInit {

  protected _ballsNumber = 40;
  protected _elem: Element;

  protected _amplitude = 25;
  protected _scale = 1;

  protected static MAX_VERTICES = 350;
  protected static MAX_VERTICES_MASK = MessageDecoBallsDirective.MAX_VERTICES - 1;

  protected r = [];

  protected _noiseCount = 0;

  constructor(protected _elemRef: ElementRef) {
    this._elem = this._elemRef.nativeElement;
  }

  ngOnInit() {
    for (var i = 0; i < MessageDecoBallsDirective.MAX_VERTICES; ++i) {
      this.r.push(Math.random());
    }

    this.appendBalls();
    this.animBalls();
  }

  protected animBalls() {
    const children = this._elem.children;
    for (let i = 0; i < children.length; i++) {
      let child = (<HTMLElement>children[i]);

      child.style.height = this.getVal(this._noiseCount) + "px";
      this._noiseCount++;
      if(this._noiseCount > 100) this._noiseCount = 0;
    }

    setTimeout(() => this.animBalls(), 5000);
  }

  protected appendBalls() {
    for (let i = 0; i < this._ballsNumber; i++) {
      let node = document.createElement("div");
      node.classList.add("deco-ball");
      this._elem.appendChild(node);
    }
  }

  protected getVal(x) {
    let scaledX = x * this._scale;
    let xFloor = Math.floor(scaledX);
    let t = scaledX - xFloor;
    let tRemapSmoothstep = t * t * (3 - 2 * t);

    let xMin = xFloor & MessageDecoBallsDirective.MAX_VERTICES_MASK;
    let xMax = (xMin + 1) & MessageDecoBallsDirective.MAX_VERTICES_MASK;

    let y = this.lerp(this.r[xMin], this.r[xMax], tRemapSmoothstep);

    return y * this._amplitude;
  };

  protected lerp(a, b, t) {
    return a * (1 - t) + b * t;
  };


}

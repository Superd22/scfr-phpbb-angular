import { Injectable } from '@angular/core';

@Injectable()
export class ThrottlerService {

  private _stack: { context: any, fn: Function, args: any }[] = [];

  constructor() {



  }

  public addToStack(context, fn: Function, args?) {
    this._stack.push({ context: context, fn: fn, args: args });

    // We need to start handling event again
    if (this._stack.length === 1) this.run();
  }

  private run() {
    let win = (<any>window);

    // If we have requestIdleCallback, make use of that.
    if (win && win.requestIdleCallback)
      (<any>window).requestIdleCallback(
        () => {
          this.execN(50);
          if(!this.emptyStack) this.run();
        }
      );

    // else we use good'ol timers
    else {
      // Wait a lil'bit 
      setTimeout(() =>
        {
          this.execN(50);
          if(!this.emptyStack) this.run();
        }, 300);
    }
  }

  private execN(n:number) {
    for(let i = 0; i < n; i++) {
      if(this.emptyStack) break;
      this.exec();
    }
  }

  private get emptyStack():boolean {
    return this._stack.length == 0;
  }

  private exec() {
    let call = this._stack.shift();
    call.fn.call(call.fn, ...call.args);

  }

}

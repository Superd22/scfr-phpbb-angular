import { BehaviorSubject } from 'rxjs/Rx';
import { Injectable, Injector } from "@angular/core";

/**
 * https://stackoverflow.com/a/41160847/2884349
 */
@Injectable()
export class ExtraModuleInjector {
  private static injector: Injector;
  public static ready: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public static get(token: any) {
    if (ExtraModuleInjector.injector) {
      return ExtraModuleInjector.injector.get(token);
    }
  }

  constructor(public injector: Injector) {
    ExtraModuleInjector.injector = injector;
    ExtraModuleInjector.ready.next(true);
  }
}
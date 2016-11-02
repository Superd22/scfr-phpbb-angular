import { StateTranslate } from '../service/state-translate.service';
import { STATES } from '../state/_.states';

import { UIRouter } from "ui-router-ng2";
import { Inject, Injectable } from '@angular/core';
import * as vis from 'ui-router-visualizer';

@Injectable()
export class PhpbbRoutingConfig {
   constructor(@Inject(StateTranslate) private stateTranslate: StateTranslate, @Inject(UIRouter) private router: UIRouter) {    
    // Register legacy Hook
    this.legacyHook();

    router.urlRouterProvider.otherwise('/');

    // Dev StateTree Debug    
    vis.visualizer(router);
  }

  private legacyHook() {
    this.router.transitionService.onBefore({to: "phpbb.legacy"}, (trans) => {
      return this.stateTranslate.legacyToSeo(trans);
    });
  }

}
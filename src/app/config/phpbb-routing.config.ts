import { StateTranslate } from '../service/state-translate.service';
import { psoIndex } from './../states/phpbb-seo/index.state';
import { STATES } from './../states/_.states';

import { UIRouter } from "ui-router-ng2";
import { StateTree } from "ui-router-visualizer";
import { Inject } from '@angular/core';

export class PhpbbRoutingConfig {
   constructor(@Inject(StateTranslate) private stateTranslate: StateTranslate, @Inject(UIRouter) private router: UIRouter) {    
    // Register legacy Hook
    this.legacyHook();

    router.urlRouterProvider.otherwise(() => router.stateService.go('phpbb.seo.index'));

    // Dev StateTree Debug
    StateTree.create(router, document.getElementById('statetree'), { width: 500, height: 300 });
  }

  private legacyHook() {
    this.router.transitionService.onBefore({to: "phpbb.legacy"}, (trans: Transition) => {
      console.log(this.stateTranslate.legacyToSeo(trans));

      // return trans.router.stateService.target(NEW_COMPUTED_STATE);
    });
  }

}
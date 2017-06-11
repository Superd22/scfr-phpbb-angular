import { StateTranslate } from '../services/state-translate.service';
import { STATES } from '../states/_.states';

import { UIRouter, StatesModule } from "@uirouter/angular";
import { Inject, Injectable, Injector } from '@angular/core';
import * as vis from '@uirouter/visualizer';

export function PhpbbRoutingConfig(router: UIRouter, injector: Injector, module: StatesModule) {
    let stateTranslate: StateTranslate = injector.get(StateTranslate);

    stateTranslate.uiRouter = router;

    function legacyHook() {
        router.transitionService.onBefore({ to: "phpbb.legacy" }, (trans) =>
            stateTranslate.legacyToSeo(trans).toPromise().then(
                state => {
                    console.log(state);
                    return state;
                },
            )
        );
    }

    function seoHook() {
        router.transitionService.onBefore({ to: "phpbb.seo.**" }, (trans) =>
            stateTranslate.getCurrentStateDataView(trans).toPromise().then(
                state => state,
            )
        );
    }

    // Register legacy Hook
    legacyHook();
    seoHook();

    //vis.visualizer(router);
}
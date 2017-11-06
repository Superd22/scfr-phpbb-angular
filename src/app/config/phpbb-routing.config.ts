import { NavigationService } from 'app/services/navigation.service';
import { PhpbbApiService } from './../services/phpbb-api.service';
import { StateTranslate } from '../services/state-translate.service';
import { STATES } from '../states/_.states';
import { UIRouter, StatesModule } from "@uirouter/angular";
import { Inject, Injectable, Injector } from '@angular/core';
//import * as vis from '@uirouter/visualizer';

declare let ga: any;

export function PhpbbRoutingConfig(router: UIRouter, injector: Injector, module: StatesModule) {
    const stateTranslate: StateTranslate = injector.get(StateTranslate);
    const phpbbApi: PhpbbApiService = injector.get(PhpbbApiService);
    const nav: NavigationService = injector.get(NavigationService);

    stateTranslate.uiRouter = router;

    function doGa() {
        ga('set', 'page', "/Forum" + location.pathname);
        ga('send', 'pageview');
    }

    function legacyHook() {
        router.transitionService.onBefore({ to: "phpbb.legacy" }, (trans) =>
            stateTranslate.legacyToSeo(trans).toPromise().then(
                state => {
                    return state;
                },
            )
        );
    }

    function seoHook() {
        router.transitionService.onBefore({ to: "phpbb.seo.**" }, (trans) =>
            stateTranslate.getCurrentStateDataView(trans).then(
                state => {
                    return state;
                },
            )
        );
    }

    function successHook() {
        router.transitionService.onSuccess({ to: "phpbb.seo.**" }, () => {
            // we're done loading.
            stateTranslate.loading.next(false);
            if(nav.sidenavIsMobileMod) nav.setSidenavToggled(false);
            doGa();
        });

        router.transitionService.onError({ to: "phpbb.seo.**" }, (t) => {
            // we're done loading.
            stateTranslate.loading.next(false);
            if(nav.sidenavIsMobileMod) nav.setSidenavToggled(false);
            doGa();
        });
    }

    // Register legacy Hook
    legacyHook();
    seoHook();
    successHook();
    //vis.visualizer(router);
}

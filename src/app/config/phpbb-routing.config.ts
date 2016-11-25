import { StateTranslate } from '../services/state-translate.service';
import { STATES } from '../states/_.states';

import { UIRouter } from "ui-router-ng2";
import { Inject, Injectable } from '@angular/core';
import * as vis from 'ui-router-visualizer';

@Injectable()
export class PhpbbRoutingConfig {
    constructor(private stateTranslate: StateTranslate, private router: UIRouter) {
        // Register legacy Hook
        this.legacyHook();


        this.seoHook();

        router.urlRouterProvider.otherwise('/');

        // Dev StateTree Debug    
        vis.visualizer(router);
    }

    private legacyHook() {
        this.router.transitionService.onBefore({ to: "phpbb.legacy" }, (trans) => 
             this.stateTranslate.legacyToSeo(trans).toPromise().then(
                state => {console.log(state);
                    return state;
                },
            )
        );
    }

    private seoHook() {
        this.router.transitionService.onBefore({ to: "phpbb.seo.**" }, (trans) => 
            this.stateTranslate.getCurrentStateDataView(trans).toPromise().then(
                state => state,
            )
        );
    }

}
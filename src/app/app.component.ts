import { IPhpbbTemplate } from './interfaces/phpbb/phpbb-tpl';
import { StateTranslate } from './services/state-translate.service';
import { PhpbbComponent } from './components/phpbb/phpbb-component.component';
import { ExtraModuleInjector } from './decorators/ExtraModuleInjector';
import { SCFRLocalStorage } from './decorators/LocalStorage.decorator';
import { LayoutService } from './material/services/layout-service.service';
import { Component, OnInit } from '@angular/core';
import { NavigationService, NavBarSupportedMode } from 'app/services/navigation.service';

@Component({
    selector: 'scfr-phpbb',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    public title = 'SCFR PHPBB APP';
    public mode: NavBarSupportedMode = 'side';
    public tpl: IPhpbbTemplate;

    constructor(
        private layout: LayoutService,
        private extra: ExtraModuleInjector,
        public navigation: NavigationService,
        public state: StateTranslate
    ) {
        this.state.latestTemplateData.subscribe((tpl) => this.tpl = tpl);
    }

    ngOnInit() {
        this.navbarHandler();
    }


    /**
     * Handles the logic around the type/mode of navbar we want
     */
    public navbarHandler() {
        this.layout.gt_md.subscribe((gt_md) => {
            const newMod: NavBarSupportedMode = (gt_md) ? 'side' : 'over';

            if (newMod != this.mode) {
                // Set our mod
                this.navigation.setSidenavMode(newMod);

                this.mode = newMod;
            }
            this.navigation.setMobileMenu(!gt_md);
        });
    }

}

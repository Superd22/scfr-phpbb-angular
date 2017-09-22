import { PhpbbComponent } from './phpbb-component.component';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { PhpbbLanguageComponent } from './../../language-module/components/phpbb-language/phpbb-language.component';
import { ServiceLocator } from './../../services/ServiceLocator';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition, StateService } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { OnInit } from '@angular/core';

/**
 * Behaves exactly like a component but is not the root of a view.
 */
export class PhpbbSubComponent extends PhpbbComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {
        this.translate.getCurrentStateData(this, true);
    }
}
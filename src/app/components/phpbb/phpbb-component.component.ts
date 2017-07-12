import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { PhpbbLanguageComponent } from './../../language-module/components/phpbb-language/phpbb-language.component';
import { ServiceLocator } from './../../services/ServiceLocator';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition, StateService } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { OnInit } from '@angular/core';

/**
 * Base PHPBB Component every component that wants to be a main
 */
export class PhpbbComponent extends PhpbbLanguageComponent implements OnInit {
  // DI
  protected translate: StateTranslate;
  /** @deprecated */
  protected transition: Transition;
  protected stateService: StateService;
  protected phpbbApi: PhpbbApiService;

  /** holds received phpbb tpl if any */
  public tpl: IPhpbbTemplate = {};

  constructor() {
    super();
    this.doDI();
  }

  private doDI() {
    this.phpbbApi = ServiceLocator.injector.get(PhpbbApiService);
    this.translate = ServiceLocator.injector.get(StateTranslate);
    this.stateService = ServiceLocator.injector.get(StateService);
  }

  public get state() {
    return this.state;
  }

  ngOnInit() {
    this.translate.getCurrentStateData(this);
  }
}

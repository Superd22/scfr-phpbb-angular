import { ServiceLocator } from './../../services/ServiceLocator';
import { StateTranslate } from './../../services/state-translate.service';
import { UnicodeToUtf8Pipe } from './../../pipes/unicode-to-utf8.pipe';
import { Transition, StateService } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { OnInit } from '@angular/core';


export class PhpbbComponent implements OnInit {
  // DI
  protected translate: StateTranslate;
  /** @deprecated */
  protected transition: Transition;
  protected stateService: StateService;
  protected phpbbApi: PhpbbApiService;

  constructor() {
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

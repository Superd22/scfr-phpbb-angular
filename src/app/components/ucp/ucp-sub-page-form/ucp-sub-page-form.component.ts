import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { StateService } from '@uirouter/angular';
import { ServiceLocator } from './../../../services/ServiceLocator';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { LanguageProviderService } from './../../../language-module/services/language-provider.service';
import { UcpPhpbbFieldComponent } from './../ucp-phpbb-field/ucp-phpbb-field.component';
import { UcpComponent } from './../ucp.component';
import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-sub-page-form',
  templateUrl: './ucp-sub-page-form.component.html',
  styleUrls: ['./ucp-sub-page-form.component.scss']
})
export class UcpSubPageFormComponent implements OnInit {

  @Input()
  /** main ucp component containing our current template */
  public ucp: UcpComponent;
  @ViewChildren(UcpPhpbbFieldComponent)
  /** list of all the active fields on this page */
  public fields: QueryList<UcpPhpbbFieldComponent>;

  // DI
  protected l: LanguageProviderService;
  protected formHelper: PhpbbFormHelperService;
  protected state: StateService;
  protected api: PhpbbApiService;

  constructor() {
    this.doDI();
  }

  ngOnInit() {
  }

  /**
   * Defer dependecy injection so child classes don't have to set-up huge constructors
   */
  private doDI() {
    this.l = ServiceLocator.injector.get(LanguageProviderService);
    this.formHelper = ServiceLocator.injector.get(PhpbbFormHelperService);
    this.state = ServiceLocator.injector.get(StateService);
    this.api = ServiceLocator.injector.get(PhpbbApiService);
  }

  /**
   * Main method to reset all the FieldComponents to their original value
   */
  public reset() {
    this.formHelper.resetAll();
  }

  /**
   * Main method to send the current state of the form to PHPBB
   * Will handle all related shenanigans.
   */
  public submit() {
    let param = { i: null, mode: null };

    param.i = this.state.params.i;
    param.mode = this.state.params.mode;

    this.ucp.tpl.ERROR = null;
    this.formHelper.postToPhpbbWFields("ucp.php", this.fields, this.ucp.tpl, param, { submit: "Submit" }).subscribe(
      (data) => {
        let tpl = data['@template'];

        if (tpl.ERROR) {
          this.api.errorSnackBar(tpl.ERROR);
          this.ucp.tpl.ERROR = tpl.ERROR;
        }
        else {
          this.api.openSnackBar("Profil mis à jour !");
          this.formHelper.regenAllBackUp()
          // Do we really need this ?
          // this.state.transitionTo(this.state.$current, null, { reload: true });
        }



      }
    )
  }

}

import { StateTranslate } from './../../../../services/state-translate.service';
import { UcpPhpbbFieldComponent } from './../../ucp-phpbb-field/ucp-phpbb-field.component';
import { PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { RegisterComponent } from './../register.component';
import { PhpbbLanguageComponent } from './../../../../language-module/components/phpbb-language/phpbb-language.component';
import { Component, OnInit, Input, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-register-agreement',
  templateUrl: './agreement.component.html',
  styleUrls: ['./agreement.component.scss']
})
export class AgreementComponent extends PhpbbLanguageComponent implements OnInit {

  @Input()
  public register: RegisterComponent;
  protected fields: QueryList<UcpPhpbbFieldComponent> = new QueryList<UcpPhpbbFieldComponent>();

  constructor(protected formHelper: PhpbbFormHelperService, protected stateT: StateTranslate) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public submit() {
    this.formHelper.postToPhpbbWFields("ucp.php", this.fields, this.register, { mode: "register" }, { agreed: true }).subscribe((data) => {
      this.stateT.unwrapTplData(this.register, data['@template']);
    });
  }
}

import { StateTranslate } from './../../../../services/state-translate.service';
import { UcpPhpbbFieldComponent } from './../../ucp-phpbb-field/ucp-phpbb-field.component';
import { PhpbbApiService } from './../../../../services/phpbb-api.service';
import { PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
import { LanguageProviderService } from "../../../../language-module/services/language-provider.service";
import { UcpSubPageFormComponent } from "../../ucp-sub-page-form/ucp-sub-page-form.component";

@Component({
  selector: 'scfr-forum-ucp-profil-info',
  templateUrl: './ucp-profil-info.component.html',
  styleUrls: ['./ucp-profil-info.component.scss']
})
export class UcpProfilInfoComponent extends UcpSubPageFormComponent implements OnInit {

  constructor(protected stateT: StateTranslate) {
    super();
  }

  ngOnInit() {
    this.parseOptions();
  }

  private parseOptions() {
    this.formHelper.handleAllOptions(this.ucp, ["S_BIRTHDAY_DAY_OPTIONS", "S_BIRTHDAY_MONTH_OPTIONS", "S_BIRTHDAY_YEAR_OPTIONS"]);
  }

  public changeCustom(event, type) {
    if (type == "pf_custom_bg")
      this.updateHeaderImage(event);
  }

  protected updateHeaderImage(newValue) {
    this.stateT.latestTemplateData.asObservable().first().subscribe(
      (tpl) => {
        tpl['PROFILE_CUSTOM_BG_VALUE'] = newValue;
        this.stateT.latestTemplateData.next(tpl);
      }
    ).unsubscribe();
  }
}

import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { StateTranslate } from './../../../services/state-translate.service';
import { UcpPhpbbFieldComponent } from './../ucp-phpbb-field/ucp-phpbb-field.component';
import { environment } from './../../../../environments/environment';
import { PhpbbComponent } from './../../phpbb/phpbb-component.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { PhpbbFormHelperService } from "../../../services/phpbb-form-helper.service";

@Component({
  selector: 'scfr-forum-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends PhpbbComponent implements OnInit {

  public capchaKey = environment.reCaptchaKey;
  @ViewChildren(UcpPhpbbFieldComponent)
  protected _fields: QueryList<UcpPhpbbFieldComponent>;
  private _capchaConfirm;

  constructor(protected formHelper: PhpbbFormHelperService, protected stateT: StateTranslate, protected api:PhpbbApiService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public capchaCallback(ev: string) {
    //
    this._capchaConfirm = ev;
  }

  public submit() {
    let posts = { agreed: true, submit: true, 'g-recaptcha-response': this._capchaConfirm };
    this.formHelper.postToPhpbbWFields("ucp.php", this._fields, this, { mode: "register" }, posts).subscribe((data) => {
      let tpl = data['@template'];

      if(tpl.MESSAGE_TEXT) {
        this.api.openSnackBar(tpl.MESSAGE_TEXT);
        this.stateService.go("phpbb.seo.index");
        return;
      }
      
      this.stateT.unwrapTplData(this, tpl);
    });
  }
}

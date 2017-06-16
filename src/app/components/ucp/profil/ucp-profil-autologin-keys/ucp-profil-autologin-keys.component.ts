import { UcpPhpbbFieldComponent } from './../../ucp-phpbb-field/ucp-phpbb-field.component';
import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-autologin-keys',
  templateUrl: './ucp-profil-autologin-keys.component.html',
  styleUrls: ['./ucp-profil-autologin-keys.component.scss']
})
export class UcpProfilAutologinKeysComponent extends UcpSubPageFormComponent implements OnInit {

  public _allMarked: boolean = false;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public toggleMark() {
    console.log(this._allMarked, "going to", !this._allMarked);
    this.fields.forEach((item) => {
      item.model = !this._allMarked;
    });

    this._allMarked = !this._allMarked;
    console.log("new", this._allMarked);
  }

}

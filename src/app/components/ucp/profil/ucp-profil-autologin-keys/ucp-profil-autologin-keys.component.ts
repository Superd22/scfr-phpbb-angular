import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-autologin-keys',
  templateUrl: './ucp-profil-autologin-keys.component.html',
  styleUrls: ['./ucp-profil-autologin-keys.component.scss']
})
export class UcpProfilAutologinKeysComponent extends UcpSubPageFormComponent  implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}

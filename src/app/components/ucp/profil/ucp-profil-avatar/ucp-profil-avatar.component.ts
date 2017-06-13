import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-avatar',
  templateUrl: './ucp-profil-avatar.component.html',
  styleUrls: ['./ucp-profil-avatar.component.scss']
})
export class UcpProfilAvatarComponent extends UcpSubPageFormComponent implements OnInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

}

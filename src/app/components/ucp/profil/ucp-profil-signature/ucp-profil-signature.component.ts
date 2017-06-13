import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-signature',
  templateUrl: './ucp-profil-signature.component.html',
  styleUrls: ['./ucp-profil-signature.component.scss']
})
export class UcpProfilSignatureComponent extends UcpSubPageFormComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() {
    super();
   }

  ngOnInit() {
  }

}

import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-signature',
  templateUrl: './ucp-profil-signature.component.html',
  styleUrls: ['./ucp-profil-signature.component.scss']
})
export class UcpProfilSignatureComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

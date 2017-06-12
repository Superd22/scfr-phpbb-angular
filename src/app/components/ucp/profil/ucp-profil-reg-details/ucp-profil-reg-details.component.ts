import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-reg-details',
  templateUrl: './ucp-profil-reg-details.component.html',
  styleUrls: ['./ucp-profil-reg-details.component.scss']
})
export class UcpProfilRegDetailsComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

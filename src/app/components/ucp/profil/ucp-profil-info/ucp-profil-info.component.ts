import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-info',
  templateUrl: './ucp-profil-info.component.html',
  styleUrls: ['./ucp-profil-info.component.scss']
})
export class UcpProfilInfoComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

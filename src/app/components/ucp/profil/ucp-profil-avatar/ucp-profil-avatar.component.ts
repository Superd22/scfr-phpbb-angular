import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-avatar',
  templateUrl: './ucp-profil-avatar.component.html',
  styleUrls: ['./ucp-profil-avatar.component.scss']
})
export class UcpProfilAvatarComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

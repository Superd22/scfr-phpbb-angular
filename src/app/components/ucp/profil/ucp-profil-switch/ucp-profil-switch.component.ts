import { UcpSwitchMainComponent } from './../../ucp-switch-main/ucp-switch-main.component';
import { StateService } from '@uirouter/angular';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-profil-switch',
  templateUrl: './ucp-profil-switch.component.html',
  styleUrls: ['./ucp-profil-switch.component.scss']
})
export class UcpProfilSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
   }

  ngOnInit() {
    this.handleMode("profile_info");
  }

}

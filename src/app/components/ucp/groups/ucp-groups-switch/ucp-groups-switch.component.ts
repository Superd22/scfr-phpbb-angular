import { UcpSwitchMainComponent } from './../../ucp-switch-main/ucp-switch-main.component';
import { StateService } from '@uirouter/angular';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-groups-switch',
  templateUrl: './ucp-groups-switch.component.html',
  styleUrls: ['./ucp-groups-switch.component.scss']
})
export class UcpGroupsSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.handleMode("membership");
  }

}

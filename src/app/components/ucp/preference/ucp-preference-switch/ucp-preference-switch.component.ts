import { UcpSwitchMainComponent } from './../../ucp-switch-main/ucp-switch-main.component';
import { StateService } from '@uirouter/angular';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-preference-switch',
  templateUrl: './ucp-preference-switch.component.html',
  styleUrls: ['./ucp-preference-switch.component.scss']
})
export class UcpPreferenceSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.handleMode("personal");
  }

}

import { StateService } from '@uirouter/angular';
import { Component, OnInit } from '@angular/core';
import { UcpSwitchMainComponent } from "app/components/ucp/ucp-switch-main/ucp-switch-main.component";

@Component({
  selector: 'scfr-forum-ucp-pm-switch',
  templateUrl: './ucp-pm-switch.component.html',
  styleUrls: ['./ucp-pm-switch.component.scss']
})
export class UcpPmSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.handleMode("profile_info");
  }

}

import { UcpSwitchMainComponent } from './../../ucp-switch-main/ucp-switch-main.component';
import { StateService } from '@uirouter/angular';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-switch',
  templateUrl: './ucp-main-switch.component.html',
  styleUrls: ['./ucp-main-switch.component.scss']
})
export class UcpMainSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
   }

  ngOnInit() {
    this.handleMode("front");
  }

}

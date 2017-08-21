import { StateService } from '@uirouter/angular';
import { UcpSwitchMainComponent } from './../../ucp-switch-main/ucp-switch-main.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-contacts-switch',
  templateUrl: './ucp-contacts-switch.component.html',
  styleUrls: ['./ucp-contacts-switch.component.scss']
})
export class UcpContactsSwitchComponent extends UcpSwitchMainComponent {

  constructor(public state: StateService) {
    super(state);
  }

  ngOnInit() {
    this.handleMode("friends");
  }

}

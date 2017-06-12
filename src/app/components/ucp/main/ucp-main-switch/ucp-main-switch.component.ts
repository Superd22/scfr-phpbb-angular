import { StateService } from '@uirouter/angular';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-switch',
  templateUrl: './ucp-main-switch.component.html',
  styleUrls: ['./ucp-main-switch.component.scss']
})
export class UcpMainSwitchComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;

  public mode: string = "front";

  constructor(public state: StateService) { }

  ngOnInit() {
    if(this.state.params["mode"]) this.mode = this.state.params["mode"];
    else this.mode = "front";
  }

}

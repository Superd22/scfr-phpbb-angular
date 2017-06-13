import { UcpComponent } from './../ucp.component';
import { StateService } from '@uirouter/angular';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-switch-main',
  templateUrl: './ucp-switch-main.component.html',
  styleUrls: ['./ucp-switch-main.component.scss']
})
/**
 * Base component for a UCP Switcher
 */
export class UcpSwitchMainComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;

  public mode: string = "front";

  constructor(public state: StateService) { }

  ngOnInit() {

  }

  public handleMode(defaultMode: string) {
    if (this.state.params["mode"]) this.mode = this.state.params["mode"];
    else this.mode = defaultMode;
  }

}

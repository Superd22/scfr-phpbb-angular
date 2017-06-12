import { StateTranslate } from './../../../../services/state-translate.service';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-front',
  templateUrl: './ucp-main-front.component.html',
  styleUrls: ['./ucp-main-front.component.scss']
})
export class UcpMainFrontComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;

  public tpl;

  constructor(private stateT: StateTranslate) { }

  ngOnInit() {
    console.log(this.ucp);
  }

}

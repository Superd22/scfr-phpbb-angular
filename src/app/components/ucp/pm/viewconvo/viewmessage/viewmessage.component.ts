import { IPHPBBExtendedPM } from './../../../../../services/private-message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-pm-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class UCPPMViewmessageComponent implements OnInit {

  @Input()
  public mp: IPHPBBExtendedPM;
  constructor() { }

  ngOnInit() {
  }

}

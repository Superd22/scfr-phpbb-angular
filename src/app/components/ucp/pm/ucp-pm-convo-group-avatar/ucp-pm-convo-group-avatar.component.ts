import { IPHPBBPMConvo } from './../../../../services/private-message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-pm-convo-group-avatar',
  templateUrl: './ucp-pm-convo-group-avatar.component.html',
  styleUrls: ['./ucp-pm-convo-group-avatar.component.scss']
})
export class UcpPmConvoGroupAvatarComponent implements OnInit {

  @Input()
  public convo: IPHPBBPMConvo;
  constructor() { }

  ngOnInit() {
  }

  public get participantsCount():number { return this.convo.participants.length; }
}

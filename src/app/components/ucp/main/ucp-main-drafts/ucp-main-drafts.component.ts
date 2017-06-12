import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-drafts',
  templateUrl: './ucp-main-drafts.component.html',
  styleUrls: ['./ucp-main-drafts.component.scss']
})
export class UcpMainDraftsComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

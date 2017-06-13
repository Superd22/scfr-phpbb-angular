import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-subscribed',
  templateUrl: './ucp-main-subscribed.component.html',
  styleUrls: ['./ucp-main-subscribed.component.scss']
})
export class UcpMainSubscribedComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

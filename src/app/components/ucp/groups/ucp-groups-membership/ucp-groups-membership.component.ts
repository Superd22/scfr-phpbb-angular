import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-groups-membership',
  templateUrl: './ucp-groups-membership.component.html',
  styleUrls: ['./ucp-groups-membership.component.scss']
})
export class UcpGroupsMembershipComponent extends UcpSubPageFormComponent  implements OnInit {

  ngOnInit() {
  }

}

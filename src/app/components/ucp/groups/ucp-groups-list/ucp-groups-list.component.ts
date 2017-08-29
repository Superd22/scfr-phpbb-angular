import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-groups-list',
  templateUrl: './ucp-groups-list.component.html',
  styleUrls: ['./ucp-groups-list.component.scss']
})
export class UcpGroupsListComponent  extends UcpSubPageFormComponent  implements OnInit {

  ngOnInit() {
  }

}

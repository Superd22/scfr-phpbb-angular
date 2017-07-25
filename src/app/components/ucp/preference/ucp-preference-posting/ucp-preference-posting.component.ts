import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit, Input } from '@angular/core';
import { UcpComponent } from './../../ucp.component';

@Component({
  selector: 'scfr-forum-ucp-preference-posting',
  templateUrl: './ucp-preference-posting.component.html',
  styleUrls: ['./ucp-preference-posting.component.scss']
})
export class UcpPreferencePostingComponent extends UcpSubPageFormComponent implements OnInit {

  ngOnInit() {
  }

}

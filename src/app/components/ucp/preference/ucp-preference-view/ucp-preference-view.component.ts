import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-preference-view',
  templateUrl: './ucp-preference-view.component.html',
  styleUrls: ['./ucp-preference-view.component.scss']
})

export class UcpPreferenceViewComponent extends UcpSubPageFormComponent implements OnInit {

  ngOnInit() {
  }

}

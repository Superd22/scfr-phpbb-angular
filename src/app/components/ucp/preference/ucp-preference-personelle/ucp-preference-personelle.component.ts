import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-preference-personelle',
  templateUrl: './ucp-preference-personelle.component.html',
  styleUrls: ['./ucp-preference-personelle.component.scss']
})
export class UcpPreferencePersonelleComponent extends UcpSubPageFormComponent implements OnInit {
  
  ngOnInit() {
  }

}

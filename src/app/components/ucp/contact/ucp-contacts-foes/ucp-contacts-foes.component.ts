import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-contacts-foes',
  templateUrl: './ucp-contacts-foes.component.html',
  styleUrls: ['./ucp-contacts-foes.component.scss']
})
export class UcpContactsFoesComponent extends UcpSubPageFormComponent implements OnInit {

  public foesOptions = { options: [] };

  ngOnInit() {
    this.foesOptions = this.formHelper.getOptionsAsObject(this.ucp.tpl['S_USERNAME_OPTIONS']);
  }

}

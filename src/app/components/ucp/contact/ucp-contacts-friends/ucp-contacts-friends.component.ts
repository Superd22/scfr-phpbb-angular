import { UcpSubPageFormComponent } from './../../ucp-sub-page-form/ucp-sub-page-form.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-contacts-friends',
  templateUrl: './ucp-contacts-friends.component.html',
  styleUrls: ['./ucp-contacts-friends.component.scss']
})
export class UcpContactsFriendsComponent extends UcpSubPageFormComponent implements OnInit {

  public friendsOptions = { options: [] };

  ngOnInit() {
    this.friendsOptions = this.formHelper.getOptionsAsObject(this.ucp.tpl['S_USERNAME_OPTIONS']);
  }


}

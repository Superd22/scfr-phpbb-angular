import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { UCPSideLink } from './../../interfaces/ucp/ucp-side-link';
import { StateTranslate } from './../../services/state-translate.service';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { StateService, Transition } from '@uirouter/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ucp',
  templateUrl: './ucp.component.html',
  styleUrls: ['./ucp.component.scss']
})
export class UcpComponent extends PhpbbComponent implements OnInit {

  @SCFRUIParam("page")
  public currentPage: string;

  /** our tabs  */
  public navLinks: { name: string, id: string }[] = [
    { name: "Général", id: "general" },
    { name: "Profil", id: "profil" },
    { name: "Préférences", id: "preferences" },
    { name: "Messages Privés", id: "mp" },
    { name: "Groupes", id: "groups" },
    { name: "Contacts", id: "contacts" },
    { name: "Notifications", id: "notifications" },
  ];

  public fullPage = ["notifications"];

  constructor(protected api: PhpbbApiService, protected transition: Transition, protected translate: StateTranslate) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public tabIsActive(tagid: string) {
    return this.currentPage == tagid;
  }

  public get isFullPage(): boolean {
    return this.fullPage.indexOf(this.currentPage) > -1;
  }



}

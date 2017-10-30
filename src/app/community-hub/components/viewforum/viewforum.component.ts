import { ISCFRPartnerGroup } from './../../interfaces/scfr-partner-group.interface';
import { PhpbbSubComponent } from './../../../components/phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-partner-viewforum',
  templateUrl: './viewforum.component.html',
  styleUrls: ['./viewforum.component.scss']
})
export class ViewforumPartnerComponent extends PhpbbSubComponent {

  public get partner(): ISCFRPartnerGroup { return this.tpl['SCFR_PARTNER_FORUM'] }

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

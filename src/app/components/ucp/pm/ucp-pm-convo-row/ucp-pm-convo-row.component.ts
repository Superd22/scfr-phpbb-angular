import { SeoUrlPipe } from './../../../../pipes/seo-url.pipe';
import { IPHPBBPMConvo } from './../../../../services/private-message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-pm-convo-row',
  templateUrl: './ucp-pm-convo-row.component.html',
  styleUrls: ['./ucp-pm-convo-row.component.scss']
})
export class UcpPmConvoRowComponent implements OnInit {

  @Input()
  public convo: IPHPBBPMConvo;
  constructor() { }

  ngOnInit() {
  }

  public get pmSlug(): string {
    return new SeoUrlPipe().transform(this.convo.title);
  }
}

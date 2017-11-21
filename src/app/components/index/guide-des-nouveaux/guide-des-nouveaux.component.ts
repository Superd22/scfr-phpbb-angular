import { WpService } from './../../../services/wp.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-guide-des-nouveaux',
  templateUrl: './guide-des-nouveaux.component.html',
  styleUrls: ['./guide-des-nouveaux.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GuideDesNouveauxComponent implements OnInit {

  public guideNouveau;

  constructor(protected wp: WpService) { }

  ngOnInit() {
    this.wp.getGuideDesNouveaux().subscribe((guide) => {
      if (guide) this.guideNouveau = guide;
    });
  }

  public get guideNewbiesParts() {
    if (this.guideNouveau)
      return Object.keys(this.guideNouveau.pageTree);
    return [];
  }

}

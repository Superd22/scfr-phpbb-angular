import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IWPNews } from '../../../interfaces/wp/wp-news.interface';

@Component({
  selector: 'scfr-forum-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss'],
})
export class ViewnewsComponent implements OnInit {

  @Input()
  public news: IWPNews;
  private _okPoly: boolean = false;

  constructor() { }

  ngOnInit() {
    /** make sure wc are ready */
    window.addEventListener('WebComponentsReady', function () {
      this._okPoly = true;
    });
  }

  public get canDisplay(): boolean {
    return this.news && this._okPoly;
  }
}

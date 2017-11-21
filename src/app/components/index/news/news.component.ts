import { IWPANews } from './../interfaces/wp-news.interface';
import { WpService } from './../../../services/wp.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  private _news: IWPANews[] = [];

  constructor(protected wp: WpService) { }

  ngOnInit() {
    this.wp.getNews().subscribe((news) => this._news = news);
  }

  public get news() {
    return this._news.slice(0,5);
  }

}

import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IWPNews } from '../../../interfaces/wp/wp-news.interface';

@Component({
  selector: 'scfr-forum-viewnews',
  templateUrl: './viewnews.component.html',
  styleUrls: ['./viewnews.component.scss'],
  encapsulation: ViewEncapsulation.Native,
})
export class ViewnewsComponent implements OnInit {

  @Input()
  public news: IWPNews;

  constructor() { }

  ngOnInit() {
  }

}

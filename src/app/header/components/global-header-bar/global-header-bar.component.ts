import { mainLinks } from './../../enums/main-links.const';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-global-header-bar',
  templateUrl: './global-header-bar.component.html',
  styleUrls: ['./global-header-bar.component.scss']
})
export class GlobalHeaderBarComponent implements OnInit {

  public topLinks = mainLinks;

  constructor() { }

  ngOnInit() {
  }

}

import { IMainHeaderBarWP } from './../../interfaces/main-header-bar-wp.interface';
import { mainLinks } from './../../enums/main-links.const';
import { Component, OnInit } from '@angular/core';
import { GlobalHeaderService } from "app/header/services/global-header.service";

@Component({
  selector: 'scfr-forum-global-header-bar',
  templateUrl: './global-header-bar.component.html',
  styleUrls: ['./global-header-bar.component.scss']
})
export class GlobalHeaderBarComponent implements OnInit {

  public topLinks = mainLinks;
  public WPHeader: IMainHeaderBarWP;

  constructor(private api: GlobalHeaderService) {
    this.api.getHeaderData().subscribe((wpHeader) => {
      this.WPHeader = wpHeader;
    });
  }

  ngOnInit() {

  }


}

import { SCMenu } from './../../enums/star-citizen.const';
import { COMMenu } from './../../enums/communaute.const';
import { IMainHeaderBarWP } from './../../interfaces/main-header-bar-wp.interface';
import { mainLinks } from './../../enums/main-links.const';
import { Component, OnInit, Input } from '@angular/core';
import { GlobalHeaderService } from "app/header/services/global-header.service";

@Component({
  selector: 'scfr-forum-global-header-bar',
  templateUrl: './global-header-bar.component.html',
  styleUrls: ['./global-header-bar.component.scss']
})
export class GlobalHeaderBarComponent implements OnInit {

  public topLinks = mainLinks;
  public WPHeader: IMainHeaderBarWP;
  @Input()
  public displayLogo: boolean = true;
  public SCM = SCMenu;
  public COM = COMMenu;

  constructor(private api: GlobalHeaderService) {
    this.api.getHeaderData().subscribe((wpHeader) => {
      this.WPHeader = wpHeader;
    });
  }

  ngOnInit() {

  }


}

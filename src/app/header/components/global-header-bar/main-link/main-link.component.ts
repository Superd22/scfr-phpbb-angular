import { IMainNavLink } from './../../../interfaces/main-nav-link.interface';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-main-link',
  templateUrl: './main-link.component.html',
  styleUrls: ['./main-link.component.scss']
})
export class MainLinkComponent implements OnInit {

  @Input()
  public link:IMainNavLink

  constructor() { }

  ngOnInit() {
  }

}

import { UCPSideLink } from './../../../interfaces/ucp/ucp-side-link';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input()
  public links:UCPSideLink[];
  
  constructor() { }

  ngOnInit() {
  }

}

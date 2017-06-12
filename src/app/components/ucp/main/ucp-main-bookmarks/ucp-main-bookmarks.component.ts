import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'scfr-forum-ucp-main-bookmarks',
  templateUrl: './ucp-main-bookmarks.component.html',
  styleUrls: ['./ucp-main-bookmarks.component.scss']
})
export class UcpMainBookmarksComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;
  constructor() { }

  ngOnInit() {
  }

}

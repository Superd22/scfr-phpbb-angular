import { UcpComponent } from './../ucp.component';
import { UCPSideLink } from './../../../interfaces/ucp/ucp-side-link';
import { Component, OnInit, Input } from '@angular/core';

export interface IUcpPmFolder {
  FOLDER_ID:number;
  FOLDER_NAME:string;
  NUM_MESSAGES:string;
  S_BLOCK_NAME:"folder";
  S_CUR_FOLDER:boolean;
  S_CUSTOM_FOLDER:boolean;
  S_FIRST_ROW:boolean;
  S_ROW_COUNT:number;
  S_ROW_NUM:number;
  /** if we have unread messages */
  S_UNREAD_MESSAGES:boolean;
  /** number of unread messages */
  UNREAD_MESSAGES:number;
  U_FOLDER:string;
}

@Component({
  selector: 'scfr-forum-ucp-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;

  public get links(): UCPSideLink[] {
    return this.ucp.tpl["t_block2"];
  }

  public get page(): string {
    return this.ucp.currentPage;
  }

  public get mode(): string {
    return "";
  }

  public get folders(): IUcpPmFolder[] {
    return this.ucp.tpl['folder'];
  }

  constructor() { }

  ngOnInit() {
  }

}

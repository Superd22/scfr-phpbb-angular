import { UcpPhpbbFieldComponent } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { IPostingOptionContainer } from './posting-options-container.interface';
import { PostingComponent } from './../posting.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-options-switcher',
  templateUrl: './posting-options-switcher.component.html',
  styleUrls: ['./posting-options-switcher.component.scss']
})
export class PostingOptionsSwitcherComponent implements OnInit {

  @Input()
  public posting: PostingComponent;
  public activeOption: IPostingOptionSwitcherTab = 'options';

  @ViewChildren('tab1,tab2,tab3')
  private _tabs: QueryList<IPostingOptionContainer>;

  constructor() { }

  ngOnInit() {
  }

  public getFields(): UcpPhpbbFieldComponent[] {
    if (!this._tabs) return [];

    let ret = [];
    this._tabs.forEach((tab) => {
      ret = ret.concat(tab.getFields().toArray());
    });

    return ret;
  }



}

export type IPostingOptionSwitcherTab = "options" | "polls" | "attachments";
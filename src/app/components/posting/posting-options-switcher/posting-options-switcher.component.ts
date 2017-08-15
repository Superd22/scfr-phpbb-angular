import { PostingComponent } from './../posting.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-options-switcher',
  templateUrl: './posting-options-switcher.component.html',
  styleUrls: ['./posting-options-switcher.component.scss']
})
export class PostingOptionsSwitcherComponent implements OnInit {

  @Input()
  public posting: PostingComponent;

  public activeOption: IPostingOptionSwitcherTab = 'options';

  constructor() { }

  ngOnInit() {
  }

}

export type IPostingOptionSwitcherTab = "options" | "polls" | "attachments";
import { UcpPhpbbFieldComponent } from './../../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { IPostingOptionContainer } from './../posting-options-container.interface';
import { PostingComponent } from './../../posting.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-attachments',
  templateUrl: './posting-attachments.component.html',
  styleUrls: ['./posting-attachments.component.scss']
})
export class PostingAttachmentsComponent implements OnInit, IPostingOptionContainer {

  @Input()
  public posting: PostingComponent;
  constructor() { }

  ngOnInit() {
  }

  @ViewChildren(UcpPhpbbFieldComponent) private _fields;
  public getFields(): QueryList<UcpPhpbbFieldComponent> {
    return this._fields;
  }

}

import { UcpPhpbbFieldComponent } from './../../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { IPostingOptionContainer } from './../posting-options-container.interface';
import { PostingComponent } from './../../posting.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-options',
  templateUrl: './posting-options.component.html',
  styleUrls: ['./posting-options.component.scss']
})
export class PostingOptionsComponent implements OnInit, IPostingOptionContainer {

  @Input()
  public posting: PostingComponent;
  public _selectedTopicType: string = "";
  private _topicTypes;

  constructor() { }

  ngOnInit() {
  }

  public get topicTypes(): { id: string, name: string }[] {
    if (!this._topicTypes) {
      this._topicTypes = [];

      this.posting.tpl.topic_type.forEach((topicType) => {
        this._topicTypes.push({ id: topicType.VALUE, name: topicType.L_TOPIC_TYPE });
      });
    }

    return this._topicTypes;
  }

  public get selectedTopicType(): string {
    if (!this._selectedTopicType) {
      for (let i = 0; i < this.posting.tpl.topic_type.length; i++) {
        if (this.posting.tpl.topic_type[i].S_CHECKED) {
          this._selectedTopicType = this.posting.tpl.topic_type[i].VALUE;
          break;
        }
      }
    }

    return this._selectedTopicType;
  }

  public set selectedTopicType(val: string) {
    this._selectedTopicType = val;
  }

  @ViewChildren(UcpPhpbbFieldComponent) private _fields;
  public getFields(): QueryList<UcpPhpbbFieldComponent> {
    return this._fields;
  }


}

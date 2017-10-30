import { StateService } from '@uirouter/angular';
import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { PrivateMessageService } from './../../../../services/private-message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-viewconvo',
  templateUrl: './viewconvo.component.html',
  styleUrls: ['./viewconvo.component.scss']
})
export class ViewconvoComponent implements OnInit {
  @Input()
  public convo_id;

  @SCFRUIParam("mode")
  public mode;
  constructor(public MPService: PrivateMessageService, public state: StateService) { }

  ngOnInit() {
    this.MPService.setCurrentConvo(this.convo_id);
  }

  public get isCompose(): boolean {
    return this.mode === "compose";
  }

  public goReplyAll() {
    this.state.go(this.state.current, Object.assign(this.state.params, {
      action: "reply",
      mode: "compose",
      reply_to_all: 1,
      p: this.convo_id
    }));
  }

}

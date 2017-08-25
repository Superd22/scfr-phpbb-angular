import { StateService } from '@uirouter/angular';
import { IPHPBBExtendedPM } from './../../../../../services/private-message.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-pm-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class UCPPMViewmessageComponent implements OnInit {

  @Input()
  public mp: IPHPBBExtendedPM;



  constructor(public state: StateService) { }

  ngOnInit() {
  }

  public goQuote() {
    this.state.go(this.state.current, Object.assign(this.state.params, {
      action: "quote",
      mode: "compose",
      p: this.mp.msg_id,
      reply_to_all: 1,
    }));
  }

  public goReply() {
    this.state.go(this.state.current, Object.assign(this.state.params, {
      action: "reply",
      mode: "compose",
      p: this.mp.msg_id,
      reply_to_all: undefined,
    }));
  }

  public goReplyToAll() {
    this.state.go(this.state.current, Object.assign(this.state.params, {
      action: "reply",
      mode: "compose",
      reply_to_all: 1,
      p: this.mp.msg_id
    }));
  }

  public goForward() {
    this.state.go(this.state.current, Object.assign(this.state.params, {
      action: "forward",
      mode: "compose",
      reply_to_all: undefined,
      p: this.mp.msg_id
    }));
  }

}

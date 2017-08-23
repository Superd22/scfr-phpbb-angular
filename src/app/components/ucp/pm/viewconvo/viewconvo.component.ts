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
  public mode = null;
  constructor(public MPService: PrivateMessageService) { }

  ngOnInit() {
    this.MPService.setCurrentConvo(this.convo_id);
  }

  public get isCompose():boolean {
    return this.mode === "compose";
  }

}

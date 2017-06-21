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
  constructor(public MPService: PrivateMessageService) { }

  ngOnInit() {
    this.MPService.setCurrentConvo(this.convo_id);
  }

}

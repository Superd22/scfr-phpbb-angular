import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';
@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class ViewmessageComponent implements OnInit {

  protected _edit = 0;
  // Phpbb postrow template
  @Input() post:PhpbbPostMessage;
  @Output() editChange = new EventEmitter();
  @Input()
  get edit() {
    return this._edit;
  }
  
  set edit(val) {
    this._edit = val;
    this.editChange.emit(this._edit);
  }

  constructor() { }

  ngOnInit() {
  }

  isEditMod() {
    return (this._edit == Number(this.post.POST_ID));
  }

}

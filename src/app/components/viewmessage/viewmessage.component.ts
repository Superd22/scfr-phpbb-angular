import { SimplePost } from './../../interfaces/simple-post';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';
import { DomSanitizer } from "@angular/platform-browser/";
@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class ViewmessageComponent implements OnInit {

  protected _edit = 0;

  /** phpbb postrow message */
  @Input("postrow") private _postrow: PhpbbPostMessage;
  /** post data if we want to overide postrow */
  @Input("post") public post: SimplePost;
  /** if this post is editable */
  @Input("editable") public editable: boolean = false;

  @Output() editChange = new EventEmitter();
  @Input()
  get edit() {
    return this._edit;
  }

  set edit(val) {
    this._edit = val;
    this.editChange.emit(this._edit);
  }

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.initPost();
  }

  /**
   * Called on init to handle inputs and build our display data
   */
  private initPost() {
    if (this.post) {
      this.sanitizeMessage();
      return;
    }
    if (this._postrow) {
      this.post = {
        message: this._postrow.MESSAGE,
        subject: this._postrow.POST_SUBJECT,
        id: this._postrow.POST_ID,
      };
      this.sanitizeMessage();
      return;
    }

    throw "NO TARGET FOR VIEW MESSAGE";
  }

  private sanitizeMessage() {
    this.post.message = this.sanitizer.bypassSecurityTrustHtml(String(this.post.message));
  }

  isEditMod() {
    return this.editable && (this._edit == Number(this._postrow.POST_ID));
  }

}

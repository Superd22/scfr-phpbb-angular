import { ViewtopicComponent } from './../viewtopic/viewtopic.component';
import { StateTranslate } from './../../services/state-translate.service';
import { SimplePost } from './../../interfaces/simple-post';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser/";
@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class ViewmessageComponent implements OnInit {

  protected _edit = 0;

  /** phpbb postrow message */
  @Input("postrow") public postrow: PhpbbPostMessage;
  /** post data if we want to overide postrow */
  @Input("post") public post: SimplePost;
  /** if this post is editable */
  @Input("editable") public editable: boolean = false;
  @Input("viewtopic") public viewtopic: ViewtopicComponent = null;
  /** if we're displaying a full post or a simple post */
  public simplePostMod: boolean = false;
  public avatarUrl: string = "";

  @Output() editChange = new EventEmitter();
  @Input()
  get edit() {
    return this._edit;
  }

  public get tpl() {return this.viewtopic.tpl};

  set edit(val) {
    this._edit = val;
    this.editChange.emit(this._edit);
  }

  constructor(public sanitizer: DomSanitizer, private stateT: StateTranslate) {
  }

  ngOnInit() {
    this.initPost();
  }

  /**
   * Called on init to handle inputs and build our display data
   */
  private initPost() {
    if (this.post) {
      this.sanitizeMessage();
      this.simplePostMod = true;
      return;
    }
    if (this.postrow) {

      this.handlePostRow()
      return;
    }

    throw "NO TARGET FOR VIEW MESSAGE";
  }

  private sanitizeMessage() {
    this.post.message = this.sanitizer.bypassSecurityTrustHtml(String(this.post.message));
  }

  public get htmlMessage(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(String(this.post.message));;
  }

  isEditMod() {
    return this.editable && (this._edit == Number(this.postrow.POST_ID));
  }

  public handlePostRow() {
    this.post = {
      message: this.postrow.MESSAGE,
      subject: this.postrow.POST_SUBJECT,
      id: this.postrow.POST_ID,
    };
    this.getAvatar()
    this.sanitizeMessage();
  }

  public getAvatar() {
    let regex = /<img.*?"avatar".*?src=['"](.*?)["']/

    let match = regex.exec(this.postrow.POSTER_AVATAR)

    if (!match || !match[1]) return;


    if (match[1].indexOf('./') === 0) {
      /** @todo figure this out */
      this.avatarUrl = "https://www.starcitizen.fr/Forum/" + match[1].substr(2);
    }
    else this.avatarUrl = match[1];
  }

  public displayInfoRight(): boolean {
    return this.postrow.J_IS_JULIET && this.tpl.S_USER_IS_JULIET ||
      (this.postrow.G_SHOW_H || this.postrow.G_SHOW_G) && !(this.tpl.S_USER_IS_JULIET && this.postrow.J_IS_JULIET)
  }

}

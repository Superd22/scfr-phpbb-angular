import { ViewtopicComponent } from './../viewtopic/viewtopic.component';
import { StateTranslate } from './../../services/state-translate.service';
import { SimplePost } from './../../interfaces/simple-post';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { PhpbbPostMessage } from '../../interfaces/phpbb/phpbb-post-message';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser/";
import { PhpbbSubComponent } from 'app/components/phpbb/phpbb-sub-component.component';
@Component({
  selector: 'app-viewmessage',
  templateUrl: './viewmessage.component.html',
  styleUrls: ['./viewmessage.component.scss']
})
export class ViewmessageComponent extends PhpbbSubComponent {

  @Input("edit")
  protected _edit = 0;

  /** phpbb postrow message */
  @Input("postrow") public postrow: PhpbbPostMessage;
  /** post data if we want to overide postrow */
  @Input("post") public post: SimplePost;
  /** if this post is editable */
  @Input("editable") public editable: boolean = false;
  @Input("viewtopic") public viewtopic: ViewtopicComponent = null;
  /** if this post is being displayed as a search result */
  @Input("search") public searchResult: boolean = false;
  /** if we're displaying a full post or a simple post */
  public simplePostMod: boolean = false;
  public avatarUrl: string = "";

  /** our change emitter for what post is being edited */
  @Output()
  editChange = new EventEmitter();

  //public get tpl() { return this.viewtopic ? this.viewtopic.tpl : {} };

  set edit(val: number) {
    this._edit = Number(val);
    this.editChange.emit(this._edit);
  }
  get edit(): number {
    return Number(this._edit);
  }

  constructor(public sanitizer: DomSanitizer, private stateT: StateTranslate, private _elRef: ElementRef) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initPost();
  }

  ngAfterViewInit() {
    this.doSpoilers();
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
      this.avatarUrl = "https://starcitizen.fr/forum-api/" + match[1].substr(2);
    }
    else this.avatarUrl = match[1];
  }

  public displayInfoRight(): boolean {
    return this.postrow.J_IS_JULIET && this.tpl.S_USER_IS_JULIET ||
      (this.postrow.G_SHOW_H || this.postrow.G_SHOW_G) && !(this.tpl.S_USER_IS_JULIET && this.postrow.J_IS_JULIET)
  }

  public doSpoilers() {
    setTimeout(() => {
      const spoilers = (<Element>this._elRef.nativeElement).querySelectorAll(".ForumSpoiler");
      for (let i = 0; i < spoilers.length; i++) {
        const spoil = spoilers[i];

        const h3 = spoil.querySelector("h3").addEventListener("click", () => {
          spoil.querySelector(".content").classList.toggle("visible");
        });
      }
    });
  }

}

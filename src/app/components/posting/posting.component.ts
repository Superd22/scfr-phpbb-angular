import { UiServiceService } from './../../material/services/ui-service.service';
import { PostingOptionsSwitcherComponent } from './posting-options-switcher/posting-options-switcher.component';
import { IPostingOptionContainer } from './posting-options-switcher/posting-options-container.interface';
import { UcpPhpbbFieldComponent } from './../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { MdSnackBar } from '@angular/material';
import { PhpbbFormHelperService } from './../../services/phpbb-form-helper.service';
import { UIRouter } from '@uirouter/angular';
import { Observable } from 'rxjs/Rx';
import { SimplePost } from './../../interfaces/simple-post';
import { PostingQueryArg } from './../../interfaces/posting-query-arg';
import { StateTranslate } from './../../services/state-translate.service';
import { Transition } from '@uirouter/angular';
import { PhpbbApiService } from './../../services/phpbb-api.service';
import { PhpbbComponent } from './../phpbb/phpbb-component.component';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})

export class PostingComponent extends PhpbbComponent {
  /** if we're currently fetching data */
  public busy: boolean;

  @ViewChildren(PostingOptionsSwitcherComponent)
  private _postingOptions: QueryList<PostingOptionsSwitcherComponent>;

  public post: {
    message: string,
    subject: string,
  } = { message: "", subject: "" };

  public preview: SimplePost;

  constructor(private formHelper: PhpbbFormHelperService, protected transition: Transition, protected snack: MdSnackBar, private UI: UiServiceService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initAssign();
  }

  ngAfterViewInit() {
  }

  /**
   * Assigns / creates our post object from the template var we got
   */
  private initAssign() {
    if (this.tpl.MESSAGE) this.post.message = this.tpl.MESSAGE;
    if (this.tpl.SUBJECT) this.post.subject = this.tpl.SUBJECT;
  }

  /**
   * Fetches a bbcode-enhanced preview of the post
   */
  public previewPost() {
    this.busy = true;

    let opts = this.forPHPBBPostingArgs();
    let form = this.forPHPBBPostingFORM("preview");

    this.phpbbApi.postPage("posting.php", form, opts, false, false, true).subscribe(
      (data) => {
        this.busy = false;
        let tpl = data["@template"];
        if (tpl.PREVIEW_MESSAGE) {
          this.preview = {
            message: tpl.PREVIEW_MESSAGE,
            subject: tpl.PREVIEW_SUBJECT,
            id: 0,
          }
          this.UI.scrollToAnchor("preview");
        }
        else this.preview = null;

        if (tpl.ERROR) {
          this.snack.open(tpl.ERROR);
        }
      }
    );
  }


  /**
   * Sends the current post to the db
   */
  public sendPost() {
    this.busy = true;

    let opts = this.forPHPBBPostingArgs();
    let form = this.forPHPBBPostingFORM("post");

    this.phpbbApi.postPage("posting.php", form, opts).catch((err, caught) => {
      return Observable.of("caca");
    }).subscribe(
      (data) => {
        console.log(data);
        this.busy = false;
      });
  }

  /**
   * Returns the get arguments to send to posting.php
   */
  private forPHPBBPostingArgs(): PostingQueryArg {
    let opts: PostingQueryArg = {
      f: this.transition.params().forumId,
      mode: "post"
    };

    if (this.transition.params().topicId) {
      opts.t = this.transition.params().topicId;
      opts.mode = "reply";
    }

    if (this.transition.params().postId) {
      opts.p = this.transition.params().postId;
      opts.mode = "edit";
    }

    if (this.transition.params().quote) {
      opts.p = null;
      opts.mode = "reply"
    }

    return opts;
  }

  /**
   * Returns the form data to send to posting
   * @param mode "preview" for generating a preview | "post" for posting the message
   */
  private forPHPBBPostingFORM(mode: "preview" | "post") {

    let opts = {};

    if (this._postingOptions) {
      this._postingOptions.first.getFields().forEach((field) => {
        // If we're falsy we don't wanna send
        if (field.model) {
          opts[field.form_name] = field.model;
        }
      });
    }

    let form = Object.assign(this.formHelper.getHiddensFromTemplateAsObject(this.tpl), opts, {
      subject: this.post.subject,
      message: this.post.message,
      addbbcode20: 100,
      attach_sig: "on",
      edit_reason: "",
    });

    if (mode == "preview") form.preview = true;
    if (mode == "post") form.post = true;

    return form;
  }


}

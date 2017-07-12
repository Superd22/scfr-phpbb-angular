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
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})

export class PostingComponent extends PhpbbComponent {
  /** if we're currently fetching data */
  public busy: boolean;

  public post: {
    message: string,
    subject: string,
  } = { message: "", subject: "" };

  public preview: SimplePost;

  constructor(private formHelper: PhpbbFormHelperService, protected transition: Transition, protected snack: MdSnackBar) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.initAssign();
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

    this.phpbbApi.postPage("posting.php", form, opts).subscribe(
      (data) => {
        this.busy = false;
        let tpl = data["@template"];
        if (tpl.PREVIEW_MESSAGE)
          this.preview = {
            message: tpl.PREVIEW_MESSAGE,
            subject: tpl.PREVIEW_SUBJECT,
            id: 0,
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
      }
      )
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
    let form = Object.assign(this.formHelper.getHiddensFromTemplateAsObject(this.tpl), {
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

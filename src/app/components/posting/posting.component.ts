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
  S_HIDDEN_FIELDS: any;
  /** raw message from the template */
  MESSAGE: string;
  /** raw subject from the template  */
  SUBJECT: string;
  S_FORM_TOKEN:string;

  /** if we're currently fetching data */
  public busy: boolean;

  public post: {
    message: string,
    subject: string
  } = { message: "", subject: "" };
  constructor(phpbbApi: PhpbbApiService, transition: Transition, translate: StateTranslate) {
    super(phpbbApi, transition, translate);
  }

  ngOnInit() {
    super.ngOnInit();
    this.initAssign();
  }

  /**
   * Assigns / creates our post object from the template var we got
   */
  private initAssign() {
    console.log(this.transition.params());
    console.log("COUCOUCOU");
    console.log(this);
    if (this.MESSAGE) this.post.message = this.MESSAGE;
    if (this.SUBJECT) this.post.subject = this.SUBJECT;
  }

  /**
   * Fetches a bbcode-enhanced preview of the post
   */
  public previewPost() {
    this.busy = true;

    let opts: PostingQueryArg = {
      f: this.transition.params().forumId,
      mode: "post"
    };

    if (this.transition.params().topicId) {
      opts.t = this.transition.params().topicId;
      opts.mode = "reply";
    }

    if(this.transition.params().postId) {
      opts.p = this.transition.params().postId;
      opts.mode = "edit";
    }

    let form = Object.assign(this.genHiddenForms(),{
      subject: this.post.subject,
      message: this.post.message,
      preview: true,
      addbbcode20: 100,
      attach_sig: "on",
      edit_reason: "",
      
    });



    this.phpbbApi.postPage("posting.php", form, opts).subscribe(
      (data) => console.log(data)
    );
  }


  /**
   * Helper method to build hidden form data phpbb expects.
   */
  private genHiddenForms():any {
    /** this expects *ALL* the forms to have value directly following name. */
    let regex = /name=["']([^'"]*)["'] value=["']([^'"]*)["']/gmi;
    let matchs = regex.exec(this.S_FORM_TOKEN)

    let hiddens:any = {};

    while(matchs != null) {
      hiddens[matchs[1]] = matchs[2];
      matchs = regex.exec(this.S_FORM_TOKEN);
    }

    let matchs2 = regex.exec(this.S_HIDDEN_FIELDS);
    while(matchs2 != null) {
      hiddens[matchs2[1]] = matchs2[2];
      matchs2 = regex.exec(this.S_HIDDEN_FIELDS);
    }

    return hiddens;
  }

  /**
   * Sends the current post to the db
   */
  public sendPost() {

  }

}

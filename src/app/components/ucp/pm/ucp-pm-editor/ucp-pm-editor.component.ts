import { PrivateMessageService } from './../../../../services/private-message.service';
import { Observable } from 'rxjs/Rx';
import { IPHPBBFieldComputedOptions, PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { IPhpbbFieldOption, UcpPhpbbFieldComponent } from './../../ucp-phpbb-field/ucp-phpbb-field.component';
import { UnicodeToUtf8Pipe } from './../../../../pipes/unicode-to-utf8.pipe';
import { PhpbbComponent } from './../../../phpbb/phpbb-component.component';
import { PhpbbApiService } from './../../../../services/phpbb-api.service';
import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SCFRUIParam } from "app/decorators/UIParam.decorator";
import { FormControl } from "@angular/forms";
import { MdAutocompleteTrigger } from "@angular/material";

@Component({
  selector: 'scfr-forum-ucp-pm-editor',
  templateUrl: './ucp-pm-editor.component.html',
  styleUrls: ['./ucp-pm-editor.component.scss']
})
export class UcpPmEditorComponent extends PhpbbComponent {


  @SCFRUIParam("action")
  private _action: "reply" | "quote" | "forward";
  @SCFRUIParam("p")
  private _postId: number;
  @SCFRUIParam("u")
  private _userTarget: number;
  @SCFRUIParam("reply_to_all")
  private _replyToAll: boolean;

  public addUserControl = new FormControl();
  public userSearch: Observable<any[]>;
  public usersAdd: string;
  public groupsAdd: string;

  public groupOptions: IPhpbbFieldOption[] = [];

  @ViewChildren(UcpPhpbbFieldComponent)
  public _fields: QueryList<UcpPhpbbFieldComponent>;

  constructor(private form: PhpbbFormHelperService, private pmApi: PrivateMessageService) {
    super();
  }

  ngOnInit() {

    console.log("action", this._action);
    this.userSearch = this.addUserControl.valueChanges.startWith(null).flatMap(
      (search) => {
        if (search && (typeof search === typeof 123 || typeof search === typeof "abc"))
          return this.phpbbApi.getPhpbbAjaxPage("memberlist.php?mode=livesearch", { username: search }).map((data) =>
            (<any>data).results
          );
        else if (search && search.result && search.result !== undefined) { this.usersAdd += "\n" + search.result; }
        return [];
      }
    );

    console.log("action", this._action);

    this.phpbbApi.getPage("ucp.php", {
      i: "ucp_pm",
      mode: "compose",
      p: this._postId,
      reply_to_all: this._replyToAll,
      u: this._userTarget,
      action: this._action,
    }).subscribe((data) => {
      this.tpl = UnicodeToUtf8Pipe.forEach(data)['@template'];
      this.postInit();
    });


  }


  public postInit() {
    this.groupOptions = this.form.getOptionsAsObject(this.tpl['S_GROUP_OPTIONS']).options;

  }

  public displayUserFn() {

  }

  /**
   * Add the current selected recipients
   * 
   * @param bcc true for bcc, false for to.
   */
  public addRecipients(bcc?: boolean) {
    let extraPost = !bcc ? { add_to: "Ajouter" } : { add_bcc: "Ajouter" };

    extraPost = Object.assign({}, extraPost, this.phpbbAllPost);

    this.form.postToPhpbbWFields("ucp.php?i=pm&mode=compose", this._fields, this.tpl, {
      p: this._postId,
      reply_to_all: this._replyToAll,
      u: this._userTarget,
      action: this._action,
    }, extraPost).subscribe((data) => {
      this.tpl = UnicodeToUtf8Pipe.forEach(data)['@template'];
      this.usersAdd = undefined;
      this.groupsAdd = undefined;
    });
  }

  /**
   * Remove the selected recipient
   * 
   * @param recipient 
   * @param bcc 
   */
  public removeRecipient(recipient, bcc?: boolean) {
    let arr: any[] = bcc ? this.tpl.bcc_recipient : this.tpl.to_recipient;

    if (arr) arr.splice(arr.findIndex((test) => test.UG_ID == recipient.UG_ID), 1);
  }

  /**
   * Return the adress list as expected by phpbb.
   */
  public get phpbbAdressList() {
    let recipients = {};

    const addRecipient = (recipient, bcc?: boolean) => {
      if (!recipient) return;
      let adr = "address_list" + (recipient.IS_USER ? "[u]" : "[g]") + "[" + recipient.UG_ID + "]";

      recipients[adr] = bcc ? "bcc" : "to";
    }

    if (this.tpl.to_recipient) this.tpl.to_recipient.map((recipient) => addRecipient(recipient));
    if (this.tpl.bcc_recipient) this.tpl.bcc_recipient.map((recipient) => addRecipient(recipient, true));

    return recipients;
  }

  public submit() {
    let extraPost = Object.assign({ post: "Envoyer" }, this.phpbbAllPost);

    this.form.postToPhpbbWFields("ucp.php?i=pm&mode=compose", this._fields, this.tpl, {
      p: this._postId,
      reply_to_all: this._replyToAll,
      u: this._userTarget,
      action: this._action || "post",
    }, extraPost).subscribe((data) => {
      let tpl = data['@template'];

      if (tpl.ERROR) this.phpbbApi.errorSnackBar(tpl.ERROR);
      //else if (tpl.PREVIEW_MESSAGE) return this.submit();
      else {
        // Send the good news.
        this.phpbbApi.openSnackBar(tpl.MESSAGE_TEXT, true);
        this.pmApi.fetchConvos();
        // Reload not-compose.
        this.state.go(this.state.current, Object.assign(this.state.params, { mode: null, subPage: null }));
      }
    });
  }

  /**
   * Return the message and title in the way phpb likes it
   */
  public get phpbbMessageTitle() {
    return { message: this.tpl.MESSAGE, subject: this.tpl.SUBJECT };
  }

  public get phpbbAllPost() {
    return Object.assign(this.phpbbAdressList, this.phpbbMessageTitle);
  }


}

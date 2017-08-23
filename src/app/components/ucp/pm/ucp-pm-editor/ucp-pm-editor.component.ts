import { Observable } from 'rxjs/Rx';
import { IPHPBBFieldComputedOptions, PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { IPhpbbFieldOption } from './../../ucp-phpbb-field/ucp-phpbb-field.component';
import { UnicodeToUtf8Pipe } from './../../../../pipes/unicode-to-utf8.pipe';
import { PhpbbComponent } from './../../../phpbb/phpbb-component.component';
import { PhpbbApiService } from './../../../../services/phpbb-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  private _action: "reply" | "quote" | "forward" = null;
  @SCFRUIParam("p")
  private _postId: number;
  @SCFRUIParam("u")
  private _userTarget: number;
  @SCFRUIParam("reply_to_all")
  private _replyToAll: boolean;

  public addUserControl = new FormControl();
  public userSearch: Observable<any[]>;
  public usersAdd: string;

  public groupOptions: IPhpbbFieldOption[] = [];

  constructor(private form: PhpbbFormHelperService) {
    super();
  }

  ngOnInit() {

    this.userSearch = this.addUserControl.valueChanges.startWith(null).flatMap(
      (search) => {
        console.log(search);
        if (search && (typeof search === typeof 123 || typeof search === typeof "abc"))
          return this.phpbbApi.getPhpbbAjaxPage("memberlist.php?mode=livesearch", { username: search }).map((data) =>
            (<any>data).results
          );
        else if (search && search.result) { this.usersAdd += "\n" + search.result; }
        return [];
      }
    );

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

}

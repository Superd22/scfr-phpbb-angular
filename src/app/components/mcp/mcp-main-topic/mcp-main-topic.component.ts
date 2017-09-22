import { MdDialog } from '@angular/material';
import { IConfirmPopOutCustomCallback, UcpConfirmPopoutComponent } from './../../ucp/ucp-confirm-popout/ucp-confirm-popout.component';
import { PhpbbTemplateResponse } from './../../../models/phpbb-template-response';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { UcpPhpbbFieldComponent, IPhpbbFieldOption } from './../../ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { SCFRUIParam } from 'app/decorators/UIParam.decorator';
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-mcp-main-topic',
  templateUrl: './mcp-main-topic.component.html',
  styleUrls: ['./mcp-main-topic.component.scss']
})
export class McpMainTopicComponent extends PhpbbSubComponent implements OnInit {

  public activeTab: 'merge-panel' | 'split-panel' | 'display-panel' = null;

  @SCFRUIParam('start')
  private _start;
  @ViewChildren(UcpPhpbbFieldComponent)
  private _fields: QueryList<UcpPhpbbFieldComponent>;
  public actionOptions: IPhpbbFieldOption[];
  public confirmCallback: IConfirmPopOutCustomCallback = { context: this, fn: this.handleMainFormResponse };

  constructor(private form: PhpbbFormHelperService, private mdDialog: MdDialog) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.tabInit();
    this.actionOptions = this.buildActionOptions();
  }

  /**
   * Init the active tab to the one selected via phpbb
   */
  public tabInit() {
    if (this.tpl.S_MERGE_VIEW) this.activeTab = 'merge-panel';
    else if (this.tpl.S_SPLIT_VIEW) this.activeTab = 'split-panel';
    else this.activeTab = 'display-panel';
  }

  /**
   * Change the page for the current topic
   * @param n the page number (1-n)
   */
  public changePage(n: number) {
    let start = (n - 1) * 15;

    this._start = start;
  }

  /**
   * Select all the messages to perform the action on
   */
  public checkAll() {
    if (!this._fields) return;

    this._fields.map((field) => {
      if (field.form_name == "post_id_list[]") field.model = field.value;
    });
  }

  /**
   * Un-select all the messages
   */
  public unCheckAll() {
    if (!this._fields) return;

    this._fields.map((field) => {
      if (field.form_name == "post_id_list[]") field.model = null;
    });
  }

  /**
   * Posts the display setting for the current thread
   * (post per page, sort order...)
   */
  public postDisplaySettings() {
    this.form.postToPhpbbWFields(this.tpl.S_MCP_ACTION, this._fields, this.tpl, null, {
      sort: "Go",
    }).subscribe((response) => {
      this.translate.getCurrentStateData(this, null, response['@template']);
    });
  }

  /**
   * Posts the main form for moderating this thread
   */
  public postMainForm() {
    this.form.postToPhpbbWFields(this.tpl.S_MCP_ACTION, this._fields, this.tpl, {}, {
      mcp_topic_submit: "Envoyer",
    }).subscribe((response) => this.handleMainFormResponse(response));
  }

  /**
   * For a given response after a moderation action, handles the UI callbcack
   * @param tpl the response we got from our form
   */
  private handleMainFormResponse(response: PhpbbTemplateResponse.DefaultResponse) {
    switch (response["@tplName"]) {
      case "confirm_body": case "confirm_delete_body": this.confirmMainForm(response); break;
      case "message_body": this.messageMainForm(response); break;
    }
  }

  /**
   * Displays a confirm box for the action we just tried to perform
   * @param tpl 
   */
  private confirmMainForm(tpl: PhpbbTemplateResponse.DefaultResponse) {
    this.mdDialog.open(UcpConfirmPopoutComponent, { data: Object.assign(tpl['@template'], { callback: this.confirmCallback }) });
  }

  /**
   * Displays a success/error message after all is said and done.
   * 
   * @param data 
   */
  public messageMainForm(data) {
    this.mdDialog.closeAll();
    this.phpbbApi.openSnackBar(data['@template']['MESSAGE_TEXT'], true);
    this.state.go(this.state.current, Object.assign(this.state.params, { phpbbResolved: false }));
  }

  public buildActionOptions(): IPhpbbFieldOption[] {
    let actions: IPhpbbFieldOption[] = [];

    if (this.tpl.S_CAN_APPROVE) actions.push({ id: "approve", name: this.L_.APPROVE_POSTS });
    if (this.tpl.S_CAN_LOCK) actions.push({ id: "lock_post", name: this.L_.LOCK_POST_POSTS });
    if (this.tpl.S_CAN_LOCK) actions.push({ id: "lock_post", name: this.L_.UNLOCK_POST_POSTS });
    if (this.tpl.S_CAN_DELETE) actions.push({ id: "delete_post", name: this.L_.DELETE_POSTS });
    if (this.tpl.S_CAN_RESTORE) actions.push({ id: "restore", name: this.L_.RESTORE_POSTS });
    if (this.tpl.S_CAN_MERGE) actions.push({ id: "merge_posts", name: this.L_.MERGE_POSTS });
    if (this.tpl.S_CAN_SPLIT) actions.push({ id: "split_all", name: this.L_.SPLIT_POSTS });
    if (this.tpl.S_CAN_SPLIT) actions.push({ id: "split_beyond", name: this.L_.SPLIT_AFTER });
    if (this.tpl.S_CAN_SYNC) actions.push({ id: "resync", name: this.L_.RESYNC });

    return actions;
  }
}

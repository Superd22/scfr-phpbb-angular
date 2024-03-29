import { IPhpbbTemplate } from './../../../interfaces/phpbb/phpbb-tpl';
import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { McpMainMoveComponent } from './../mcp-main-move/mcp-main-move.component';
import { UcpConfirmPopoutComponent, IConfirmPopOutCustomCallback } from './../../ucp/ucp-confirm-popout/ucp-confirm-popout.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit, Input } from '@angular/core';
import { PhpbbSubComponent } from './../../phpbb/phpbb-sub-component.component';

@Component({
  selector: 'scfr-forum-mcp-quickmod-topic',
  templateUrl: './mcp-quickmod-topic.component.html',
  styleUrls: ['./mcp-quickmod-topic.component.scss']
})
export class McpQuickmodTopicComponent extends PhpbbSubComponent {

  @Input("topicId")
  private _topicId;
  /** actions that can be performed via ajax without going to mcp */
  private _ajaxActions = ['lock', 'unlock', 'delete_topics', 'restore_topic', 'make_normal', 'make_sticky', 'make_announce', 'make_global'];
  /** actions that can be performed via a pop-out without going to mcp */
  private _popOutActions = ["move"];


  constructor(private mdDialog: MdDialog) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public confirmCallback: IConfirmPopOutCustomCallback = { context: this, fn: this.handleAjaxConfirm };

  /**
   * Execute the specified action for the current thread
   * @param action the action to perform
   */
  public doQuickMod(action: IPHPBBMCPQuickMod) {
    if (this.isAjaxAction(action)) this.doAjaxAction(action);
    else if (this.isPopOutAction(action)) this.doPopOutAction(action);
    else this.goToMcp(action);
  }

  /**
   * Perform the specified action via ajax
   * 
   * @param action 
   */
  public doAjaxAction(action: IPHPBBMCPQuickMod) {
    this.phpbbApi.getPhpbbAjaxPage(action.LINK, { '_': Date.now() }).subscribe((data) => {
      this.openMainConfirm(data);
    });
  }

  /**
   * Handles the confirmation from the pop-out.
   * 
   * @param data 
   */
  public handleAjaxConfirm(data) {
    let tpl = data['@template'];
    this.mdDialog.closeAll();

    if (tpl.ERROR) {
      this.phpbbApi.errorSnackBar(tpl.ERROR);
    }
    else {
      this.phpbbApi.openSnackBar(tpl.MESSAGE_TEXT);
      this.state.go(this.state.current, Object.assign(this.state.current.params, { phpbbResolved: false }));
    }
  }

  /**
   * Opens a shared pop-out confirm with supplied tpl.
   * @param tpl 
   */
  public openMainConfirm(tpl: IPhpbbTemplate) {
    this.mdDialog.open(UcpConfirmPopoutComponent, { data: Object.assign(tpl, { callback: this.confirmCallback }) });
  }


  /**
   * Displays a pop-out to do the supplied action
   * @param action 
   */
  public doPopOutAction(action: IPHPBBMCPQuickMod) {
    this.phpbbApi.getPage(action.LINK).subscribe((data) => {
      this.mdDialog.open(McpMainMoveComponent, { data: Object.assign(UnicodeToUtf8Pipe.forEach(data['@template']), { callback: this.confirmCallback }) });
    });
  }

  /**
   * Goes to mcp to perform specified action
   * 
   * @param action 
   */
  public goToMcp(action: IPHPBBMCPQuickMod) {
    let mcp = {};

    // slice './mcp.php?' 
    for (let args of action.LINK.slice(10).split("&")) {
      const tuple = args.split("=");
      mcp[tuple[0]] = tuple[1]
    }

    this.state.go("phpbb.seo.mcp", mcp);
  }

  /**
   * Check if an action can be performed via ajax
   * @param action the action to perform
   * @return boolean
   */
  public isAjaxAction(action: IPHPBBMCPQuickMod): boolean {
    return this._ajaxActions.indexOf(action.VALUE) > -1;
  }

  /**
   * Check if an action can be performed via a confirm
   * @param action the action to perform
   */
  public isPopOutAction(action: IPHPBBMCPQuickMod): boolean {
    return this._popOutActions.indexOf(action.VALUE) > -1;
  }

}


export interface IPHPBBMCPQuickMod {
  LINK: string;
  S_BLOCK_NAME: string;
  S_FIRST_ROW: boolean;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
  TITLE: string;
  /** action id */
  VALUE: string;
}
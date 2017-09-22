import { McpReportBodyComponent } from './../../mcp/mcp-report-body/mcp-report-body.component';
import { ViewtopicComponent } from './../../viewtopic/viewtopic.component';
import { StateService } from '@uirouter/angular';
import { StateTranslate } from './../../../services/state-translate.service';
import { DialogDeleteComponent } from './dialog-delete/dialog-delete.component';
import { PhpbbApiService } from './../../../services/phpbb-api.service';
import { PhpbbPostMessage } from './../../../interfaces/phpbb/phpbb-post-message';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MdDialog } from "@angular/material/";

@Component({
  selector: 'scfr-forum-message-action-bar',
  templateUrl: './message-action-bar.component.html',
  styleUrls: ['./message-action-bar.component.scss']
})
export class MessageActionBarComponent implements OnInit {

  @Input("postrow")
  public postrow: PhpbbPostMessage
  @Output("edit")
  private _edit: EventEmitter<number> = new EventEmitter<number>();
  @Input("viewtopic") public viewtopic: ViewtopicComponent = null;

  private _deleteHiddenFields: { action: string, hidden: any } = null;

  constructor(private api: PhpbbApiService, public dialog: MdDialog, public stateT: StateTranslate, private state: StateService) { }

  ngOnInit() {
  }

  /**
   * Called when the user pushed the edit button
   */
  public editThis() {
    this._edit.emit(this.postrow.POST_ID);
  }

  /**
   * Called when the user pushed the delete button
   */
  public deleteThis() {
    let dialogRef = this.dialog.open(DialogDeleteComponent);

    let formfetched = dialogRef.componentInstance.fetchDeleteConfirm({ p: this.postrow.POST_ID, f: this.stateT.latestTemplateData._getNow()["FORUM_ID"] });

    let dialogClose = dialogRef.afterClosed().map(result => {
      if (result.delete) {
        this.doDelete(result.reason);
      }
    });

    let gotcha = false;
    let hiddens = {};
    formfetched.concat(dialogClose).subscribe((data) => {
      if (!gotcha) {
        this._deleteHiddenFields = data;
      }
    });
  }

  /**
   * Will tell phpbb to delete this post
   * @param reason optional reason for the deletion
   */
  private doDelete(reason?: string) {
    this.api.postPage(this._deleteHiddenFields.action, Object.assign({ mode: "delete", confirm: "Yes", delete_reason: reason }, this._deleteHiddenFields.hidden)).subscribe(
      (data) => {
        let tpl = data['@template'];
        this.state.reload();
      }
    )
  }

  public popOutcallback(data) {
    this.dialog.closeAll();
    console.log(data);
  }

  /**
   * Report this post to phpbb
   */
  public report() {
    /** this.api.getPage(this.postrow.U_REPORT).subscribe(data => {
      this.dialog.open(McpReportBodyComponent, { data: Object.assign(data['@template'], { callback: { context: this, fn: this.popOutcallback } }) });
    });*/
  }

}

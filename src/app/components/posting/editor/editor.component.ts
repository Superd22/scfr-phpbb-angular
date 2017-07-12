import { StateTranslate } from './../../../services/state-translate.service';
import { IPhpbbTemplate } from './../../../interfaces/phpbb/phpbb-tpl';
import { PostingComponent } from './../posting.component';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'scfr-forum-post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input('subject')
  private _subject: string = "";
  @Input('message')
  public _message: string = "";
  @Output()
  private messageChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  public placeholder: string = "Message";

  @Input("tpl")
  private _tpl: IPhpbbTemplate;

  constructor(private stateT: StateTranslate) {
  }


  public get message() {
    return this._message;
  }

  public set message(message: string) {
    this._message = message;
    this.messageChange.emit(message);
  }

  ngOnInit() {
    this.handleTpl();
    this.initEditor();
  }

  /**
   * Initiliaze the editor, handling the inputs and generating bbcode & such
   */
  private initEditor() {
  }

  /**
   * Ensures the necessery phpbb template data are present.
   */
  private handleTpl() {
    // if we have no supplied tpl, fetch the latest.
    if (!this._tpl)
      this.stateT.latestTemplateData.asObservable().first().subscribe((tpl) => {
        this._tpl = tpl;
      });
  }
}

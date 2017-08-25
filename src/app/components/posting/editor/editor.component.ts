import { IBBcode } from './interfaces/bbcode.interface';
import { IPHPBBCustomTag } from './interfaces/phpbb-custom-tag.interface';
import { baseBBcode } from './enums/base-bbcode.enum';
import { StateTranslate } from './../../../services/state-translate.service';
import { IPhpbbTemplate } from './../../../interfaces/phpbb/phpbb-tpl';
import { PostingComponent } from './../posting.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'scfr-forum-post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditorComponent implements OnInit {

  @Input('subject')
  private _subject: string = "";
  @Input('message')
  public _message: string = "";
  @Output()
  private messageChange: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  private subjectChange: EventEmitter<string> = new EventEmitter<string>();

  @Input()
  public placeholder: string = "Message";

  public baseBB = baseBBcode;
  public customBB: IBBcode[] = [];

  @Input("tpl")
  private _tpl: IPhpbbTemplate;

  @ViewChild('editor')
  private _editor;
  public get editor(): ElementRef { return this._editor; }



  constructor(private stateT: StateTranslate) { }

  public get subject() { return this._subject; }
  public get message() {
    return this._message;
  }

  public set subject(subject: string) {
    this._subject = subject;
    this.subjectChange.emit(subject);
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
    this.computeCustomBBcode();
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

  private computeCustomBBcode() {
    if (this._tpl && this._tpl.custom_tags) {

      this._tpl.custom_tags.forEach((custom: IPHPBBCustomTag) => {
        this.customBB.push({
          name: custom.BBCODE_TAG,
          code: this.explodeBBcodeName(custom.BBCODE_NAME),
          help: custom.BBCODE_HELPLINE
        });
      });
    }
  }

  private explodeBBcodeName(name: string): string[] {
    return name.replace(new RegExp(/'/g), "").split(",");
  }
}

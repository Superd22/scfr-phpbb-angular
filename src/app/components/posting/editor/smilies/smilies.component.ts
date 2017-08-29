import { EditorComponent } from './../editor.component';
import { BbcodeButtonComponent } from './../bbcode-button/bbcode-button.component';
import { Component, OnInit, Input, Host } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-editor-smilies',
  templateUrl: './smilies.component.html',
  styleUrls: ['./smilies.component.scss']
})
export class PostingEditorSmiliesComponent implements OnInit {

  @Input()
  public smilies: IPostingEditorSmiley[];
  public buttons: PostingEditorASmiley[];

  constructor( @Host() protected _editor: EditorComponent) { }

  ngOnInit() {
    this.createButtons();
  }

  protected createButtons() {
    if (this.smilies) {
      this.buttons = [];
      this.smilies.map((smiley) => { this.buttons.push(new PostingEditorASmiley(this._editor, smiley)); });
    }
  }

}


export class PostingEditorASmiley extends BbcodeButtonComponent {
  constructor(editor: EditorComponent, public smiley: IPostingEditorSmiley) {
    super(editor);
    this.bbcode = { name: smiley.SMILEY_DESC, code: [smiley.A_SMILEY_CODE] };
  }
}

export interface IPostingEditorSmiley {
  A_SMILEY_CODE: string;
  SMILEY_CODE: string;
  SMILEY_DESC: string;
  /** in px, without the px suffix */
  SMILEY_HEIGHT: string;
  SMILEY_IMG: string;
  /** in px, without the px suffix */
  SMILEY_WIDTH: string;
  S_BLOCK_NAME: string;
  S_FIRST_ROW: boolean;
  S_ROW_COUNT: number;
  S_ROW_NUM: number;
}
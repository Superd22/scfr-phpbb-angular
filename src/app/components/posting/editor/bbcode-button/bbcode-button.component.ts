import { EditorComponent } from './../editor.component';
import { IBBcode } from './../interfaces/bbcode.interface';
import { Component, OnInit, Input, Host } from '@angular/core';

@Component({
  selector: 'scfr-forum-bbcode-button',
  templateUrl: './bbcode-button.component.html',
  styleUrls: ['./bbcode-button.component.scss']
})
export class BbcodeButtonComponent implements OnInit {

  @Input()
  /** display name for this bbcode */
  public name: string;
  @Input()
  /** display explain for this bbcode */
  public explain: string;
  @Input("bbcode")
  public bbcode: IBBcode;

  constructor( @Host() private editor: EditorComponent) { }

  ngOnInit() {
  }

  public applyBBcode(event: Event) {
    event.stopPropagation();
    // Get our (optional) current selection
    let select = this.checkForSelection();

    // We need to wrap our code around a selection
    if (select) {
      this.replaceMsgWithCode(select.start, select.end);
      this.focusToEditor(select);
    }
    // We need to append our code
    else {
      this.replaceMsgWithCode((this.editor.message.length + 1));
      this.focusToEditor(select, true);
    }

  }

  protected replaceMsgWithCode(start: number, end?: number) {
    let newMessage = this.editor.message;
    if (end === null || end === undefined) end = start;

    // Add starting [code]
    newMessage = this.stringSplice(newMessage, start, 0, this.bbcode.code[0]);
    end += this.bbcode.code[0].length;

    // Add closing [/code] if applicable
    if (this.bbcode.code[1] && this.bbcode.code[1] != this.bbcode.code[0]) {
      newMessage = this.stringSplice(newMessage, end, 0, this.bbcode.code[1]);
    }

    // Emit changes
    this.editor.message = newMessage;
  }

  /**
   * Used to set the focus back in the editor after clicking the button
   * @param select the selection we might have had beforehand
   * @param append if we're appending code to a non existent text
   */
  protected focusToEditor(select: ISelection, append?: boolean) {
    const firstBBLength = this.bbcode.code[0].length;
    const editor = <HTMLTextAreaElement>this.editor.editor.nativeElement;

    let newSelect: ISelection;

    // We did not have a selection to begin with
    if (append || select.end === select.start) {
      // this will move to right after the first block of bbcode.
      if (select)
        newSelect = { start: select.start + firstBBLength, end: select.start + firstBBLength };
      else newSelect = { start: firstBBLength, end: firstBBLength }
    }
    // We had a selection, keep it.
    else
      newSelect = { start: select.start + firstBBLength, end: select.end + firstBBLength };

    editor.focus();
    setTimeout(() => editor.setSelectionRange(newSelect.start, newSelect.end));
  }

  /**
   * Splices a substring into another string
   * @param original the original string to splice into
   * @param start index at which to insert
   * @param del number of original char to delete
   * @param newSub substr to insert at the specified index
   * @return {string} the newly constructed string
   */
  protected stringSplice(original: string, start: number, del: number, newSub: string): string {
    return original.slice(0, start) + newSub + original.slice(start + Math.abs(del));
  }

  /**
   * Check if there is a valid selection into the editor
   * @return Selection a selection inside the editor, or null.
   */
  protected checkForSelection(): ISelection {
    let editor: HTMLTextAreaElement = this.editor.editor.nativeElement;
    return { start: editor.selectionStart, end: editor.selectionEnd };
  }

}

interface ISelection { start: number, end: number };
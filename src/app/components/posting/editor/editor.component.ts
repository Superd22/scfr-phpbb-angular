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

  constructor() { }


  public get message() {
    return this._message;
  }

  public set message(message: string) {
    this._message = message;
    console.log("emit", message);
    this.messageChange.emit(message);
  }

  ngOnInit() {
  }

}

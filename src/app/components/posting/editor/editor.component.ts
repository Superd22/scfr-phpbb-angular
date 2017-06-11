import { PostingComponent } from './../posting.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @Input('subject')
  private _subject: string = "";
  @Input('message')
  private _message: string = "";

  constructor() { }


  ngOnInit() {
  }

}

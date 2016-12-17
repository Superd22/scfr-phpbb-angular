import { PostingComponent } from './../posting.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  // Subject of the post
  _subject: string = "";
  // Content of the post
  _message: string = "";

  constructor() { }

  @Input('subject') 
  @Input('message')

  ngOnInit() {
  }

}

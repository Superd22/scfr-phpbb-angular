import { PostingComponent } from './../../posting.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-attachments',
  templateUrl: './posting-attachments.component.html',
  styleUrls: ['./posting-attachments.component.scss']
})
export class PostingAttachmentsComponent implements OnInit {

  @Input()
  public posting: PostingComponent;
  constructor() { }

  ngOnInit() {
  }

}

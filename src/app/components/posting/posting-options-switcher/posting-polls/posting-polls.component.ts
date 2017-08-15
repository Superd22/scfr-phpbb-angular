import { PostingComponent } from './../../posting.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-posting-polls',
  templateUrl: './posting-polls.component.html',
  styleUrls: ['./posting-polls.component.scss']
})
export class PostingPollsComponent implements OnInit {

  @Input()
  public posting: PostingComponent;
  
  constructor() { }

  ngOnInit() {
  }

}

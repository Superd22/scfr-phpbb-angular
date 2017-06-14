import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { DomSanitizer } from '@angular/platform-browser/';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewforum-topic-row',
  templateUrl: './viewforum-topic-row.component.html',
  styleUrls: ['./viewforum-topic-row.component.scss']
})
export class ViewforumTopicRowComponent implements OnInit {

  @Input()
  public topic;

  public replyAuthor: ColoredLinkUser;
  public topicAuthor: ColoredLinkUser;


  constructor(private s: DomSanitizer) { }

  ngOnInit() {
    this.getInfoForPosters();
  }

  public getInfoForPosters() {
    this.parseUserFromTo(this.topic.LAST_POST_AUTHOR_FULL, this.topic.LAST_POST_AUTHOR_COLOUR, "replyAuthor");
    this.parseUserFromTo(this.topic.TOPIC_AUTHOR_FULL, this.topic.TOPIC_AUTHOR_COLOUR, "topicAuthor");
  }

  private parseUserFromTo(from, color, to) {
    let regex = /.*?href=["']\.\/memberlist\.php.*?u=([0-9]+).*?>(.*?)<\/a>/
    let m = regex.exec(from);
    if (m) {
      this[to] = {
        userId: Number(m[1]),
        userColor: color,
        userName: m[2],
      }
    }
  }



}

export interface ColoredLinkUser {
  userId: number,
  userColor: string,
  userName: string,
}

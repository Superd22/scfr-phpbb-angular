import { Collected } from 'ng2-rx-collector';
import { PhpbbWebsocketService } from './../../../services/phpbb-websocket.service';
import { IPhpbbViewforumTopicrow } from './interfaces/phpbb-viewforum-topicrow.interface';
import { PhpbbLanguageComponent } from './../../../language-module/components/phpbb-language/phpbb-language.component';
import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { DomSanitizer } from '@angular/platform-browser/';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewforum-topic-row',
  templateUrl: './viewforum-topic-row.component.html',
  styleUrls: ['./viewforum-topic-row.component.scss']
})
export class ViewforumTopicRowComponent extends PhpbbLanguageComponent implements OnInit {

  @Input()
  public topic: IPhpbbViewforumTopicrow;

  public replyAuthor: ColoredLinkUser;
  public topicAuthor: ColoredLinkUser;

  private _lastPostId: number;

  @Collected() private collected;

  constructor(private s: DomSanitizer, private ws: PhpbbWebsocketService) {
    super();
  }

  ngOnInit() {
    this.getInfoForPosters();
    this.ws.onReply(this.topic.TOPIC_ID).takeUntil(this.collected).subscribe((data) => {
      const postData = data.data.post;

      // Replies are number of post - OP
      const replyCount = Number(postData.topic_posts_approved) - 1;

      // Check if we wanna go to unread
      if (replyCount > Number(this.topic.REPLIES)) this.topic.S_UNREAD_TOPIC = true;

      /**
       * Update our infos
       */
      (<any>this.topic.REPLIES) = replyCount;
      this.topic.TOPIC_VIEWS = postData.topic_views;
      this.replyAuthor = {
        userId: Number(postData.topic_last_poster_id),
        userColor: postData.topic_last_poster_colour,
        userName: postData.topic_last_poster_name
      };
      this.lastPostId = Number(postData.topic_last_post_id);

    });
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

  /**
   * Get the id of the last post in this thread
   */
  public get lastPostId(): number {
    if (this._lastPostId) return this._lastPostId;

    let regex = /p=([0-9]*)/;
    let m = regex.exec(this.topic.U_LAST_POST);

    if (m) return Number(m[1]);
    return null;
  }

  public set lastPostId(n: number) {
    this._lastPostId = n;
  }

}

export interface ColoredLinkUser {
  userId: number,
  userColor: string,
  userName: string,
}

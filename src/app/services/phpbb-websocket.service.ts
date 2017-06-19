import { PhpbbWebSocket } from './../interfaces/phpbb/phpbb-ws';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

@Injectable()
export class PhpbbWebsocketService {

  private _ws: WebSocket;

  private _wsOnMessage: Observable<PhpbbWebSocket.WSMessage>;

  constructor() {
    /** @todo url */
    console.log("[WS] Connecting to ws");
    this._ws = new WebSocket("ws://" + location.hostname + ":8080");
    this._wsOnMessage = Observable.fromEvent(this._ws, "message").map((ev: MessageEvent) => {
      return JSON.parse(ev.data);
    });

    this.doBindings();

  }

  private doBindings() {
    this._wsOnMessage.subscribe((ev) => {
      console.log("PHPBBWS", ev);
    });
  }


  public get onMessage(): Observable<PhpbbWebSocket.WSMessage> {
    return this._wsOnMessage;
  }

  public get onPosting(): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this._wsOnMessage.filter((data) => data.event == "PHPBB_POSTING");
  }

  public onNewThread(forum_id: number): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => msg.data.mode == "post" && Number(msg.data.data.forum_id) == forum_id);
  }

  public onNewPostsInForum(forum_id:number): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => msg.data.mode != "edit" && Number(msg.data.data.forum_id) == forum_id);
  }

  public onReply(topic_id: number): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => msg.data.mode == "reply" && Number(msg.data.data.topic_id) == topic_id);
  }


}

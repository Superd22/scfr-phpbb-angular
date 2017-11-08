import { ServiceLocator } from './ServiceLocator';
import { environment } from './../../environments/environment';
import { PhpbbWebSocket } from './../interfaces/phpbb/phpbb-ws';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { StateTranslate } from "./state-translate.service";

@Injectable()
export class PhpbbWebsocketService {

  private _ws: WebSocket;

  private _wsOnMessage: Observable<PhpbbWebSocket.WSMessage>;
  private _userId: number = 1;
  private stateT: StateTranslate;


  constructor() {
    /** @todo url */
    console.log("[WS] Connecting to ws");

    try {
      this._ws = new WebSocket(environment.websocket);
      this._wsOnMessage = Observable.fromEvent(this._ws, "message").map((ev: MessageEvent) => {
        return JSON.parse(ev.data);
      });

      this.doBindings();

    }
    catch (e) {
      console.log("could not connect to ws", e);
    }
  }

  private doBindings() {
    this._wsOnMessage.subscribe((ev) => {});

    this.stateT = ServiceLocator.injector.get(StateTranslate);
    this.stateT.latestTemplateData.subscribe((data) => {
      this._userId = Number(data['CURRENT_USER_ID']);
    });
  }


  public get onMessage(): Observable<PhpbbWebSocket.WSMessage> {
    if (this._wsOnMessage) return this._wsOnMessage;
    return Observable.of(null);
  }

  public get onPosting(): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this._wsOnMessage.filter((data) => data.event == "PHPBB_POSTING");
  }

  public onNewThread(forum_id: number, includeOwnEvents: boolean = true): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => this.notOwnEvents(includeOwnEvents, msg) && msg.data.mode == "post" && Number(msg.data.data.forum_id) == forum_id);
  }

  public onNewPostsInForum(forum_id: number, includeOwnEvents: boolean = true): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => this.notOwnEvents(includeOwnEvents, msg) && msg.data.mode != "edit" && Number(msg.data.data.forum_id) == forum_id);
  }

  public onReply(topic_id: number, includeOwnEvents: boolean = true): Observable<PhpbbWebSocket.WSPostingEvent> {
    return this.onPosting.filter((msg) => this.notOwnEvents(includeOwnEvents, msg) && msg.data.mode == "reply" && Number(msg.data.data.topic_id) == topic_id);
  }


  public notOwnEvents(include: boolean, msg) {
    return include || Number(msg.data.data.poster_id) != this._userId;
  }

}
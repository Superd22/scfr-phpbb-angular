import { StateService } from '@uirouter/angular';
import { PrivateMessageService } from './../../../services/private-message.service';
import { Component, OnInit } from '@angular/core';

import { SCFRUIParam } from '../../../decorators/UIParam.decorator';

@Component({
  selector: 'scfr-forum-ucp-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {

  @SCFRUIParam("pm_id")
  public _convoId;


  @SCFRUIParam("mode")
  public _mode;

  constructor(public MPService: PrivateMessageService, public state: StateService) {
  }

  ngOnInit() {
    try {
      // user asked for a specific convo via url
      if (this._convoId > 0) {
        // Wait for convos to load
        let waitInitLoad = this.MPService.convosChange.subscribe((convos) => {
          if (convos) {
            // No clue why i have to do that but i do.
            this.state.go("phpbb.seo.ucp.pmConvo", this.state.params);
            waitInitLoad.unsubscribe();
          }
        });
      }
    }
    catch (any) {
      // If we don't have the required convo, fetch it.
      // ? Shouldn't it be handled via service ?

    }
  }

  public get isCompose() {
    return !this._convoId && this._mode == "compose";
  }

}

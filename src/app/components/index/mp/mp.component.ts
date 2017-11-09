import { Component, OnInit } from '@angular/core';
import { PrivateMessageService } from './../../../services/private-message.service';

@Component({
  selector: 'scfr-forum-index-mp',
  templateUrl: './mp.component.html',
  styleUrls: ['./mp.component.scss']
})
export class MpComponent implements OnInit {

  constructor(private mp: PrivateMessageService) { }

  ngOnInit() {
    this.mp.page = 1;
    this.mp.fetchConvos();
  }


  public get convos() {
    return this.mp.convos.slice(0,4);
  }

}

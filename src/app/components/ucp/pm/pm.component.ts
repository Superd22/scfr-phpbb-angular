import { PrivateMessageService } from './../../../services/private-message.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-pm',
  templateUrl: './pm.component.html',
  styleUrls: ['./pm.component.scss']
})
export class PmComponent implements OnInit {

  constructor(public MPService: PrivateMessageService) { }

  ngOnInit() {
  }

}

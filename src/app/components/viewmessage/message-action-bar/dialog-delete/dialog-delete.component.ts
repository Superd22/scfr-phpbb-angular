import { Observable } from 'rxjs/Rx';
import { PhpbbApiService } from './../../../../services/phpbb-api.service';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";

@Component({
  selector: 'scfr-forum-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  public reason: string = "";

  constructor(public dialogRef: MdDialogRef<DialogDeleteComponent>, public api: PhpbbApiService) { }

  ngOnInit() {
  }

  public fetchDeleteConfirm(packet: { f: number, p: number }): Observable<any> {
    let p: any = packet;
    p.mode = "delete";

    return this.api.getPage("posting.php", p).map(
      (data) => {
        let hidden = this.api.genHiddenForms(data['@template']);
        if(hidden['sid']) this.api.registerSid(hidden['sid']);

        return { action: data['@template']['S_CONFIRM_ACTION'].replace(/&amp;/g, '&'), hidden: hidden }
      }
    );
  }

}

import { PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { Observable } from 'rxjs/Rx';
import { PhpbbApiService } from './../../../../services/phpbb-api.service';
import { Component, OnInit } from '@angular/core';
import { MdDialogRef } from "@angular/material";
import { PhpbbPostMessage } from 'app/interfaces/phpbb/phpbb-post-message';

@Component({
  selector: 'scfr-forum-dialog-delete',
  templateUrl: './dialog-delete.component.html',
  styleUrls: ['./dialog-delete.component.scss']
})
export class DialogDeleteComponent implements OnInit {

  public reason: string = "";

  constructor(public dialogRef: MdDialogRef<DialogDeleteComponent>, public api: PhpbbApiService, public formHelper: PhpbbFormHelperService) { }

  ngOnInit() {
  }

  public fetchDeleteConfirm(postrow: PhpbbPostMessage): Observable<any> {

    const del = (<string>postrow.U_DELETE).match(/f=([0-9]*)/);
    console.log(del);

    const packet = {
      p: Number(postrow.POST_ID),
      f: Number(del[1])
    };

    let p: any = packet;
    p.mode = "delete";

    return this.api.getPage("posting.php", p).map(
      (data) => {
        let hidden = this.formHelper.getHiddensFromTemplateAsObject(data['@template']);
        if (hidden['sid']) this.api.registerSid(hidden['sid']);

        return { action: data['@template']['S_CONFIRM_ACTION'].replace(/&amp;/g, '&'), hidden: hidden }
      }
    );
  }

}

import { Collected } from 'ng2-rx-collector';
import { PhpbbService } from './../../../../services/phpbb.service';
import { PhpbbSubComponent } from './../../../phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-index-tab-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent extends PhpbbSubComponent implements OnInit {

  @Collected() private _collected;

  constructor(protected phpbb: PhpbbService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();

    this.phpbb.forumReadStatus.takeUntil(this._collected).subscribe((event) => {
        /** @todo find a nicer way */
        // Just refetch the index info bcoz we got an event.
        this.phpbbApi.getIndex().subscribe((index) => {
          const tpl = index['@template'];
          this.tpl = tpl;
          this.translate.assignNewTemplateData(tpl);
        });
    });
  }

}

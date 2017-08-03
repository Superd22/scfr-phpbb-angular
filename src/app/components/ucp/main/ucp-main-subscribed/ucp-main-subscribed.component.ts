import { PhpbbFormHelperService } from './../../../../services/phpbb-form-helper.service';
import { StateService } from '@uirouter/angular';
import { MdCheckbox } from '@angular/material';
import { UcpComponent } from './../../ucp.component';
import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'scfr-forum-ucp-main-subscribed',
  templateUrl: './ucp-main-subscribed.component.html',
  styleUrls: ['./ucp-main-subscribed.component.scss']
})
export class UcpMainSubscribedComponent implements OnInit {

  @Input()
  public ucp: UcpComponent;


  @ViewChildren(MdCheckbox)
  /** list of all the active fields on this page */
  public fields: QueryList<MdCheckbox>;

  constructor(public state: StateService, public formHelper: PhpbbFormHelperService) { }

  ngOnInit() {
  }

  public shouldDisplayUnMarkButton() {
    if (!this.fields) return false;

    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i] && this.fields[i].checked) return true;
    }

    return false;
  }

  public submit() {
    let param = { i: null, mode: null };

    param.i = this.state.params.i;
    param.mode = this.state.params.mode;

    this.ucp.tpl.ERROR = null;
    let post = {
      unwatch: "Unwatch marked"
    }

    if (this.ucp.tpl.forumrow) this.ucp.tpl.forumrow.forEach((forum) => {
      if (forum.checked) post['f[' + forum.FORUM_ID + ']'] = "on"
    });
    if (this.ucp.tpl.topicrow) this.ucp.tpl.topicrow.forEach((topic) => {
      if (topic.checked) post['f[' + topic.TOPIC_ID + ']'] = "on"
    });

    this.formHelper.postToPhpbbWFieldObject("ucp.php", post, this.ucp.tpl, param).subscribe(
      (data) => {
        this.formHelper.ucpOnPostCallback(data, this.ucp);
        let p = this.state.params;
        p["phpbbResolved"] = false;
        this.state.go(this.state.$current, p);
      }
    );
  }

}

import { UnicodeToUtf8Pipe } from './../../../pipes/unicode-to-utf8.pipe';
import { PhpbbFormHelperService } from './../../../services/phpbb-form-helper.service';
import { IPhpbbPollOption } from './interfaces/phpbb-poll-option.interface';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { StateTranslate } from './../../../services/state-translate.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MdCheckbox } from "@angular/material";

@Component({
  selector: 'scfr-forum-viewtopic-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  public tpl: IPhpbbTemplate;
  public options: IPhpbbPollOption[];
  public chartData = [];
  public pie = true;
  public maxVote = 0;

  @ViewChildren(MdCheckbox)
  /** list of all the active fields on this page */
  public checkboxes: QueryList<MdCheckbox>;

  public colors = {
    domain: [
      "#af1b29",
      "#f7e813",
      "#63b5dd",
      "#084270",
      "#FFF",
      "#41225e",
      "#0038a5",
      "#9c366a",
      "#016a42",
      "#e77310"
    ]
  };

  constructor(protected stateT: StateTranslate, protected form: PhpbbFormHelperService) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.tpl = tpl;
      this.options = tpl.poll_option;
      this.init();
    });
  }

  /**
   * Builds the data for the charts
   * using the options array.
   */
  protected buildChartData() {
    this.chartData = [];
    if (this.tpl['S_HAS_POLL'])
      this.options.forEach(opt => {
        this.chartData.push({
          name: opt.POLL_OPTION_CAPTION,
          value: opt.POLL_OPTION_RESULT
        });
      });
  }

  protected init() {
    this.buildChartData();
    this.getMaxOpt();
  }

  /**
   * Gets the maximum number of votes possible for this user
   * and stores it in this.maxVote
   */
  protected getMaxOpt() {
    if (!this.tpl.S_CAN_VOTE) {
      this.maxVote = 0;
      return;
    }

    let regex = new RegExp(/<strong>([0-9]+)<\/strong>/);
    let m = regex.exec(this.tpl.L_MAX_VOTES);

    if (m) {
      this.maxVote = Number(m[1]);
    }
  }

  public get votes(): number {
    return this.getVoteIds().length;
  }

  public getVoteIds(): number[] {
    let votes = [];
    if (this.checkboxes) this.checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        votes.push(Number(checkbox.value));
      }
    });

    return votes;
  }

  public sendVote() {
    let post = new FormData();
    post.append("update", "Submit Vote");
    this.getVoteIds().forEach(id => {
      post.append("vote_id[]", String(id));
    });


    this.form.postToPhpbbWFieldObject(new UnicodeToUtf8Pipe().transform(this.tpl.S_POLL_ACTION), post, this.tpl, null, null, true).subscribe(
      (caca) => {
        console.log("caca");
      }
    );
  }

  ngOnInit() {
  }

}

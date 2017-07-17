import { IPhpbbPollOption } from './interfaces/phpbb-poll-option.interface';
import { IPhpbbTemplate } from 'app/interfaces/phpbb/phpbb-tpl';
import { StateTranslate } from './../../../services/state-translate.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(protected stateT: StateTranslate) {
    this.stateT.latestTemplateData.subscribe((tpl) => {
      this.tpl = tpl;
      console.log(tpl);
      this.options = tpl.poll_option;
      this.buildChartData();

    });
  }

  protected buildChartData() {
    this.chartData = [];
    if (this.tpl['S_HAS_POLL'])
      this.options.forEach(opt => {
        console.log(opt.POLL_OPTION_CAPTION, opt.POLL_OPTION_RESULT);
        this.chartData.push({
          name: opt.POLL_OPTION_CAPTION,
          value: opt.POLL_OPTION_RESULT
        });
      });
  }
  ngOnInit() {
  }

}

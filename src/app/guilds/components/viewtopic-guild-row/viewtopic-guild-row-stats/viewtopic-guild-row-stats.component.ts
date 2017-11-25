import { IPhpbbViewforumTopicrow } from './../../../../components/viewforum/viewforum-topic-row/interfaces/phpbb-viewforum-topicrow.interface';
import { PhpbbLanguageComponent } from './../../../../language-module/components/phpbb-language/phpbb-language.component';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewtopic-guild-row-stats',
  templateUrl: './viewtopic-guild-row-stats.component.html',
  styleUrls: ['./viewtopic-guild-row-stats.component.scss']
})
export class ViewtopicGuildRowStatsComponent extends PhpbbLanguageComponent implements OnInit {

  @Input() topic: IPhpbbViewforumTopicrow

  comitType = comitTypes

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

enum comitTypes {
  "Normal",
  "Hardcore",
  "Casual",
}
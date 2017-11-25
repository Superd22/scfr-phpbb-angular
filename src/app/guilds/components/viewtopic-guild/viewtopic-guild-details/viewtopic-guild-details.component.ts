import { PhpbbSubComponent } from './../../../../components/phpbb/phpbb-sub-component.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'scfr-forum-viewtopic-guild-details',
  templateUrl: './viewtopic-guild-details.component.html',
  styleUrls: ['./viewtopic-guild-details.component.scss']
})
export class ViewtopicGuildDetailsComponent extends PhpbbSubComponent implements OnInit {

  public get commitment():string {
    switch(this.tpl.GUILD_COMMITMENT) {
      case "Regular": return "Normal";
      case "Hardcore": return "Hardcore";
      case "Casual": return "Casual";
    }

    return this.tpl.GUILD_COMMITMENT
  }

  public get archetype():string {
    switch(this.tpl.GUILD_ARCHETYPE) {
      case "Organization": return "Organisation";
      case "Faith": return "Foi";
      case "Syndicate": return "Syndicat";
    }
    return this.tpl.GUILD_ARCHETYPE
  }

  public get lastMaj():string {
    return new Date(Number(this.tpl.GUILD_LAST_SCRAPE_DATE) * 1000).toLocaleDateString();
  }

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

}

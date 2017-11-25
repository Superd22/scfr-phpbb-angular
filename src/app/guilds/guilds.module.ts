import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewforumGuildComponent } from './components/viewforum-guild/viewforum-guild.component';
import { ViewtopicGuildRowStatsComponent } from './components/viewtopic-guild-row/viewtopic-guild-row-stats/viewtopic-guild-row-stats.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [ViewforumGuildComponent, ViewtopicGuildRowStatsComponent],
  exports: [ViewtopicGuildRowStatsComponent]
})
export class GuildsModule { }

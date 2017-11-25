import { SCFRMaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewforumGuildComponent } from './components/viewforum-guild/viewforum-guild.component';
import { ViewtopicGuildRowStatsComponent } from './components/viewtopic-guild-row/viewtopic-guild-row-stats/viewtopic-guild-row-stats.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewtopicGuildDetailsComponent } from './components/viewtopic-guild/viewtopic-guild-details/viewtopic-guild-details.component';
import { ViewtopicGuildTitleComponent } from './components/viewtopic-guild/viewtopic-guild-title/viewtopic-guild-title.component';
import { ScfrcommonModule } from 'app/common/scfrcommon.module';

@NgModule({
  imports: [
    CommonModule,
    ScfrcommonModule,
    FlexLayoutModule,
    SCFRMaterialModule
  ],
  declarations: [
    ViewforumGuildComponent, ViewtopicGuildRowStatsComponent, ViewtopicGuildDetailsComponent, ViewtopicGuildTitleComponent
  ],
  exports: [ViewtopicGuildRowStatsComponent, ViewtopicGuildTitleComponent, ViewtopicGuildDetailsComponent]
})
export class GuildsModule { }

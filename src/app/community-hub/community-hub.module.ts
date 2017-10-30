import { SCFRMaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewforumPartnerComponent } from './components/viewforum/viewforum.component';

@NgModule({
  imports: [
    CommonModule,
    SCFRMaterialModule
  ],
  declarations: [ViewforumPartnerComponent],
  exports: [ViewforumPartnerComponent]
})
export class CommunityHubModule { }

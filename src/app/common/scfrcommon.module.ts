import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SCFRAvatarURL} from './pipes/avatar-url.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SCFRAvatarURL
  ],
  exports: [
    SCFRAvatarURL
  ]
})
export class ScfrcommonModule { }

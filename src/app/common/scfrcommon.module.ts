import { UnsafeSrc } from './pipes/unsafe-src.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SCFRAvatarURL} from './pipes/avatar-url.pipe';
import { SanitizeHtml } from './pipes/sanitize-html.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SCFRAvatarURL, SanitizeHtml, UnsafeSrc
  ],
  exports: [
    SCFRAvatarURL, SanitizeHtml, UnsafeSrc
  ],
  providers: [
    SanitizeHtml
  ]
})
export class ScfrcommonModule { }

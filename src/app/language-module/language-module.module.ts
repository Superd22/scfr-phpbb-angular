import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageProviderService } from "./services/language-provider.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[LanguageProviderService],
})
export class LanguageModuleModule { }

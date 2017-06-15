import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageProviderService } from "./services/language-provider.service";
import { PhpbbLanguageComponent } from './components/phpbb-language/phpbb-language.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers:[LanguageProviderService],
})
export class LanguageModuleModule { }

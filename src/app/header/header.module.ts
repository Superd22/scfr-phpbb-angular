import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderBarComponent } from './components/global-header-bar/global-header-bar.component';
import { MainLinkComponent } from './components/global-header-bar/main-link/main-link.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GlobalHeaderBarComponent, MainLinkComponent],
  exports: [GlobalHeaderBarComponent]
})
export class HeaderModule { }

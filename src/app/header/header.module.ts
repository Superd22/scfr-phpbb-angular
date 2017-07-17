import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderBarComponent } from './components/global-header-bar/global-header-bar.component';
import { MainLinkComponent } from './components/global-header-bar/main-link/main-link.component';
import { GlobalHeaderService } from './services/global-header.service';
import { SmallSecondaryLinkComponent } from './components/global-header-bar/small-secondary-link/small-secondary-link.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [GlobalHeaderBarComponent, MainLinkComponent, SmallSecondaryLinkComponent],
  exports: [GlobalHeaderBarComponent],
  providers: [GlobalHeaderService]
})
export class HeaderModule { }

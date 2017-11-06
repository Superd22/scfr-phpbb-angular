import { UIRouterModule } from '@uirouter/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalHeaderBarComponent } from './components/global-header-bar/global-header-bar.component';
import { MainLinkComponent } from './components/global-header-bar/main-link/main-link.component';
import { GlobalHeaderService } from './services/global-header.service';
import { SmallSecondaryLinkComponent } from './components/global-header-bar/small-secondary-link/small-secondary-link.component';
import { NotificationPannelComponent } from './components/global-header-bar/notification/notification-pannel/notification-pannel.component';
import { ANotifComponent } from './components/global-header-bar/notification/a-notif/a-notif.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MobileNavigationComponent} from './components/global-header-bar/mobile-navigation/mobile-navigation.component';
import {MdButtonModule, MdIconModule} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MdButtonModule,
    MdIconModule,
    UIRouterModule.forChild()
  ],
  declarations: [
    GlobalHeaderBarComponent,
    MainLinkComponent,
    SmallSecondaryLinkComponent,
    NotificationPannelComponent,
    ANotifComponent,
    MobileNavigationComponent,
  ],
  exports: [GlobalHeaderBarComponent, MobileNavigationComponent],
  providers: [GlobalHeaderService]
})
export class HeaderModule { }

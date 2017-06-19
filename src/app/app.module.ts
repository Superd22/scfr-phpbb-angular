import { EditorComponent } from './components/posting/editor/editor.component';
import { ServiceLocator } from './services/ServiceLocator';
import { PhpbbFormHelperService } from './services/phpbb-form-helper.service';
import { ViewconvoComponent } from './components/ucp/pm/viewconvo/viewconvo.component';
import { PrivateMessageService } from './services/private-message.service';
import { SCFRMaterialModule } from './material/material.module';
import { PmComponent } from './components/ucp/pm/pm.component';
import { UcpComponent } from './components/ucp/ucp.component';
import { ViewmessageComponent } from './components/viewmessage/viewmessage.component';
import { PhpbbRoot } from './components/phpbb/root/phpbb-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';

import { PhpbbApiService } from './services/phpbb-api.service';
import { PhpbbService } from './services/phpbb.service';
import { LoginService } from './services/login.service';
import { StateTranslate } from './services/state-translate.service';


import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';

import { PhpbbRoutingConfig } from './config/phpbb-routing.config';

import { STATES } from './states/_.states';
import { SeoUrlPipe } from './pipes/seo-url.pipe';
import { UnicodeToUtf8Pipe } from './pipes/unicode-to-utf8.pipe';
import { MemberlistComponent } from './components/memberlist/memberlist.component';
import { TeamComponent } from './components/memberlist/team/team.component';
import { ViewprofileComponent } from './components/memberlist/viewprofile/viewprofile.component';
import { ViewonlineComponent } from './components/viewonline/viewonline.component';
import { LoginComponent } from './components/login/login.component';

import { IndexComponent } from './components/index/index.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ViewforumComponent } from './components/viewforum/viewforum.component';
import { ViewtopicComponent } from './components/viewtopic/viewtopic.component';
import { PostingComponent } from './components/posting/posting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BottomLoggedInComponent } from './components/login/bottom-logged-in/bottom-logged-in.component';
import { MessageActionBarComponent } from './components/viewmessage/message-action-bar/message-action-bar.component';
import { DialogDeleteComponent } from './components/viewmessage/message-action-bar/dialog-delete/dialog-delete.component';
import { SideNavComponent } from './components/ucp/side-nav/side-nav.component';
import { UcpMainFrontComponent } from './components/ucp/main/ucp-main-front/ucp-main-front.component';
import { UcpMainSwitchComponent } from './components/ucp/main/ucp-main-switch/ucp-main-switch.component';
import { UcpProfilSwitchComponent } from './components/ucp/profil/ucp-profil-switch/ucp-profil-switch.component';
import { UcpMainSubscribedComponent } from './components/ucp/main/ucp-main-subscribed/ucp-main-subscribed.component';
import { UcpMainBookmarksComponent } from './components/ucp/main/ucp-main-bookmarks/ucp-main-bookmarks.component';
import { UcpMainDraftsComponent } from './components/ucp/main/ucp-main-drafts/ucp-main-drafts.component';
import { UcpProfilInfoComponent } from './components/ucp/profil/ucp-profil-info/ucp-profil-info.component';
import { UcpProfilSignatureComponent } from './components/ucp/profil/ucp-profil-signature/ucp-profil-signature.component';
import { UcpProfilRegDetailsComponent } from './components/ucp/profil/ucp-profil-reg-details/ucp-profil-reg-details.component';
import { UcpProfilAvatarComponent } from './components/ucp/profil/ucp-profil-avatar/ucp-profil-avatar.component';
import { UcpProfilAutologinKeysComponent } from './components/ucp/profil/ucp-profil-autologin-keys/ucp-profil-autologin-keys.component';
import { UcpSwitchMainComponent } from './components/ucp/ucp-switch-main/ucp-switch-main.component';
import { LanguageModuleModule } from "./language-module/language-module.module";
import { UcpPhpbbFieldComponent } from './components/ucp/ucp-phpbb-field/ucp-phpbb-field.component';
import { UcpSubPageFormComponent } from './components/ucp/ucp-sub-page-form/ucp-sub-page-form.component';
import { ForumLinkComponent } from './components/navigation/forum-link/forum-link.component';
import { LookForForumPipe } from './components/navigation/pipes/look-for-forum.pipe';
import { GetFilteredResultPipe } from './pipes/get-filtered-result.pipe';
import { FilteredForumsPipe } from './components/navigation/pipes/filtered-forums.pipe';
import { ReinsertForumsPipe } from './components/navigation/pipes/reinsert-forums.pipe';
import { HeaderBarComponent } from './components/navigation/header-bar/header-bar.component';
import { ViewforumForumRowComponent } from './components/viewforum/viewforum-forum-row/viewforum-forum-row.component';
import { ViewforumTopicRowComponent } from './components/viewforum/viewforum-topic-row/viewforum-topic-row.component';
import { InformationsComponent } from './components/informations/informations.component';
import { GlobalPaginationComponent } from './components/navigation/global-pagination/global-pagination.component';
import { BackgroundComponent } from './components/background/background.component';
import { SpinnerLoadingComponent } from './components/loading/spinner-loading/spinner-loading.component';
import { NotificationsService } from "./services/notifications.service";
import { PhpbbWebsocketService } from "./services/phpbb-websocket.service";
import { NotificationsComponent } from './components/navigation/notifications/notifications.component';
import { ANotificationRowComponent } from './components/navigation/notifications/a-notification-row/a-notification-row.component';

@NgModule({
    declarations: [
        SeoUrlPipe,
        UnicodeToUtf8Pipe,
        AppComponent,
        IndexComponent,
        NavigationComponent,
        PhpbbRoot,
        ViewforumComponent,
        ViewtopicComponent,
        MemberlistComponent,
        TeamComponent,
        ViewprofileComponent,
        ViewonlineComponent,
        EditorComponent,
        LoginComponent,
        PostingComponent,
        ViewmessageComponent,
        UcpComponent,
        PmComponent,
        ViewconvoComponent,
        BottomLoggedInComponent,
        MessageActionBarComponent,
        DialogDeleteComponent,
        SideNavComponent,
        UcpMainFrontComponent,
        UcpMainSwitchComponent,
        UcpProfilSwitchComponent,
        UcpMainSubscribedComponent,
        UcpMainBookmarksComponent,
        UcpMainDraftsComponent,
        UcpProfilInfoComponent,
        UcpProfilSignatureComponent,
        UcpProfilRegDetailsComponent,
        UcpProfilAvatarComponent,
        UcpProfilAutologinKeysComponent,
        UcpSwitchMainComponent,
        UcpPhpbbFieldComponent,
        UcpSubPageFormComponent,
        ForumLinkComponent,
        LookForForumPipe,
        GetFilteredResultPipe,
        FilteredForumsPipe,
        ReinsertForumsPipe,
        HeaderBarComponent,
        ViewforumForumRowComponent,
        ViewforumTopicRowComponent,
        InformationsComponent,
        GlobalPaginationComponent,
        BackgroundComponent,
        SpinnerLoadingComponent,
        NotificationsComponent,
        ANotificationRowComponent,
    ],
    imports: [
        UIRouterModule.forRoot({
            states: STATES,
            config: PhpbbRoutingConfig
        }),
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MaterialModule,
        SCFRMaterialModule,
        FlexLayoutModule,
        LanguageModuleModule
    ],
    entryComponents: [
        DialogDeleteComponent
    ],
    providers: [
        PhpbbApiService, PhpbbService, LoginService, StateTranslate, PrivateMessageService, PhpbbFormHelperService, 
        NotificationsService, PhpbbWebsocketService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}

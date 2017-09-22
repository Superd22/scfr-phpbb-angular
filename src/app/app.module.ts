import { UcpMainNotificationsComponent } from './components/ucp/notifications/notifications.component';
import { ExtraModuleInjector } from './decorators/ExtraModuleInjector';
import { HeaderService } from './services/header-service.service';
import { CommonModule } from '@angular/common';
import { ContenteditableDirective } from './components/posting/editor/directives/content-editable.directive';
import { NavPmComponent } from './components/navigation/pm/pm.component';
import { EditorComponent } from './components/posting/editor/editor.component';
import { ServiceLocator } from './services/ServiceLocator';
import { PhpbbFormHelperService } from './services/phpbb-form-helper.service';
import { ViewconvoComponent } from './components/ucp/pm/viewconvo/viewconvo.component';
import { UCPPMViewmessageComponent } from './components/ucp/pm/viewconvo/viewmessage/viewmessage.component';

import { APP_BASE_HREF } from '@angular/common';
import { PrivateMessageService } from './services/private-message.service';
import { SCFRMaterialModule } from './material/material.module';
import { HeaderModule } from './header/header.module';
import { PmComponent } from './components/ucp/pm/pm.component';
import { UcpComponent } from './components/ucp/ucp.component';
import { ViewmessageComponent } from './components/viewmessage/viewmessage.component';
import { PhpbbRoot } from './components/phpbb/root/phpbb-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from '@uirouter/angular';
import { ColorPickerModule } from 'ngx-color-picker';

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
import { RegisterComponent } from './components/ucp/register/register.component';
import { AgreementComponent } from './components/ucp/register/agreement/agreement.component';
import { ReCaptchaModule } from 'angular2-recaptcha';
import { MomentModule } from 'angular2-moment';
import { BbcodeButtonComponent } from './components/posting/editor/bbcode-button/bbcode-button.component';

import { SanitizeHtml } from './pipes/sanitize-html.pipe';
import { BbcodeColorComponent } from './components/posting/editor/bbcode-color/bbcode-color.component';
import { HeaderBackgroundComponent } from './components/navigation/header-bar/header-background/header-background.component';
import { FloatingMainHeaderDirective } from './directives/floating-main-header.directive';
import { ImageHeaderFitDirective } from './directives/image-header-fit.directive';
import { PollComponent } from './components/viewtopic/poll/poll.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PopOutLoginComponent } from './components/login/pop-out-login/pop-out-login.component';
import { UcpPmSwitchComponent } from './components/ucp/pm/ucp-pm-switch/ucp-pm-switch.component';
import { UcpPreferenceSwitchComponent } from './components/ucp/preference/ucp-preference-switch/ucp-preference-switch.component';
import { UcpPreferencePersonelleComponent } from './components/ucp/preference/ucp-preference-personelle/ucp-preference-personelle.component';
import { UcpPreferencePostingComponent } from './components/ucp/preference/ucp-preference-posting/ucp-preference-posting.component';
import { UcpPreferenceViewComponent } from './components/ucp/preference/ucp-preference-view/ucp-preference-view.component';
import { PhpbbUsernameComponent } from './components/phpbb/phpbb-username/phpbb-username.component';
import { UcpPmConvoRowComponent } from './components/ucp/pm/ucp-pm-convo-row/ucp-pm-convo-row.component';
import { UcpPmConvoGroupAvatarComponent } from './components/ucp/pm/ucp-pm-convo-group-avatar/ucp-pm-convo-group-avatar.component';
import { PostingOptionsSwitcherComponent } from './components/posting/posting-options-switcher/posting-options-switcher.component';
import { PostingOptionsComponent } from './components/posting/posting-options-switcher/posting-options/posting-options.component';
import { PostingAttachmentsComponent } from './components/posting/posting-options-switcher/posting-attachments/posting-attachments.component';
import { PostingPollsComponent } from './components/posting/posting-options-switcher/posting-polls/posting-polls.component';
import { SearchComponent } from './components/search/search.component';
import { WpService } from "app/services/wp.service";
import { ListStopAtBottomDirective } from './components/navigation/forum-link/directives/list-stop-at-bottom.directive';
import { SearchBodyComponent } from './components/search/search-body/search-body.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { ViewnewsComponent } from './components/viewmessage/viewnews/viewnews.component';
import { UcpGroupsSwitchComponent } from './components/ucp/groups/ucp-groups-switch/ucp-groups-switch.component';
import { UcpGroupsMembershipComponent } from './components/ucp/groups/ucp-groups-membership/ucp-groups-membership.component';
import { UcpGroupsListComponent } from './components/ucp/groups/ucp-groups-list/ucp-groups-list.component';
import { UcpContactsSwitchComponent } from './components/ucp/contact/ucp-contacts-switch/ucp-contacts-switch.component';
import { UcpContactsFriendsComponent } from './components/ucp/contact/ucp-contacts-friends/ucp-contacts-friends.component';
import { UcpContactsFoesComponent } from './components/ucp/contact/ucp-contacts-foes/ucp-contacts-foes.component';
import { UcpConfirmPopoutComponent } from './components/ucp/ucp-confirm-popout/ucp-confirm-popout.component';
import { ThrottlerService } from "app/services/throttler.service";
import { PhpbbGroupComponent } from './components/phpbb/phpbb-group/phpbb-group.component';
import { UcpPmEditorComponent } from './components/ucp/pm/ucp-pm-editor/ucp-pm-editor.component';
import { PostingEditorSmiliesComponent, PostingEditorASmiley } from './components/posting/editor/smilies/smilies.component';
import { AsmileyComponent } from './components/posting/editor/smilies/asmiley/asmiley.component';
import { MessageDecoBallsDirective } from './components/viewmessage/directives/message-deco-balls.directive';
import { UcpPreferenceNotificationsComponent } from './components/ucp/preference/ucp-preference-notifications/ucp-preference-notifications.component';
import { UcpNotificationsSwitchComponent } from './components/ucp/notifications/ucp-notifications-switch/ucp-notifications-switch.component';
import { UcpNotificationListComponent } from './components/ucp/notifications/ucp-notification-list/ucp-notification-list.component';
import { UcpNotificationOptionsComponent } from './components/ucp/notifications/ucp-notification-options/ucp-notification-options.component';
import { environment } from "environments/environment";
import { McpComponent } from './components/mcp/mcp.component';
import { McpSidenavComponent } from './components/mcp/mcp-sidenav/mcp-sidenav.component';
import { McpMainComponent } from './components/mcp/mcp-main/mcp-main.component';
import { McpQueueUnapprovedComponent } from './components/mcp/mcp-queue-unapproved/mcp-queue-unapproved.component';
import { McpQueueUnapprovedPostsComponent } from './components/mcp/mcp-queue-unapproved-posts/mcp-queue-unapproved-posts.component';
import { McpQueueDeletedTopicsComponent } from './components/mcp/mcp-queue-deleted-topics/mcp-queue-deleted-topics.component';
import { McpQueueDeletedPostsComponent } from './components/mcp/mcp-queue-deleted-posts/mcp-queue-deleted-posts.component';
import { McpReportPmReportsComponent } from './components/mcp/mcp-report-pm-reports/mcp-report-pm-reports.component';
import { McpReportPmReportsClosedComponent } from './components/mcp/mcp-report-pm-reports-closed/mcp-report-pm-reports-closed.component';
import { McpReportReportsComponent } from './components/mcp/mcp-report-reports/mcp-report-reports.component';
import { McpReportsClosedComponent } from './components/mcp/mcp-reports-closed/mcp-reports-closed.component';
import { McpNotesMainComponent } from './components/mcp/mcp-notes-main/mcp-notes-main.component';
import { McpWarnMainComponent } from './components/mcp/mcp-warn-main/mcp-warn-main.component';
import { McpWarnListComponent } from './components/mcp/mcp-warn-list/mcp-warn-list.component';
import { McpLogsMainComponent } from './components/mcp/mcp-logs-main/mcp-logs-main.component';
import { McpBanUserComponent } from './components/mcp/mcp-ban-user/mcp-ban-user.component';
import { McpBanUpComponent } from './components/mcp/mcp-ban-up/mcp-ban-up.component';
import { McpBanEmailComponent } from './components/mcp/mcp-ban-email/mcp-ban-email.component';
import { McpQuickmodTopicComponent } from './components/mcp/mcp-quickmod-topic/mcp-quickmod-topic.component';
import { McpMainTopicComponent } from './components/mcp/mcp-main-topic/mcp-main-topic.component';
import { McpMainForumComponent } from './components/mcp/mcp-main-forum/mcp-main-forum.component';
import { McpMainForumTopicSelectComponent } from './components/mcp/mcp-main-forum-topic-select/mcp-main-forum-topic-select.component';
import { McpMainMoveComponent } from './components/mcp/mcp-main-move/mcp-main-move.component';

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
        NavPmComponent,
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
        RegisterComponent,
        AgreementComponent,
        BbcodeButtonComponent,
        ContenteditableDirective,
        SanitizeHtml,
        BbcodeColorComponent,
        HeaderBackgroundComponent,
        FloatingMainHeaderDirective,
        ImageHeaderFitDirective,
        PollComponent,
        PopOutLoginComponent,
        UcpPmSwitchComponent,
        UcpPreferenceSwitchComponent,
        UcpPreferencePersonelleComponent,
        UcpPreferencePostingComponent,
        UcpPreferenceViewComponent,
        PhpbbUsernameComponent,
        UcpPmConvoRowComponent,
        UcpPmConvoGroupAvatarComponent,
        UCPPMViewmessageComponent,
        PostingOptionsSwitcherComponent,
        PostingOptionsComponent,
        PostingAttachmentsComponent,
        PostingPollsComponent,
        SearchComponent,
        ListStopAtBottomDirective,
        SearchBodyComponent,
        SearchResultsComponent,
        ViewnewsComponent,
        UcpGroupsSwitchComponent,
        UcpGroupsMembershipComponent,
        UcpGroupsListComponent,
        UcpContactsSwitchComponent,
        UcpContactsFriendsComponent,
        UcpContactsFoesComponent,
        UcpConfirmPopoutComponent,
        PhpbbGroupComponent,
        UcpPmEditorComponent,
        PostingEditorSmiliesComponent,
        PostingEditorASmiley,
        AsmileyComponent,
        MessageDecoBallsDirective,
        UcpPreferenceNotificationsComponent,
        UcpNotificationsSwitchComponent,
        UcpMainNotificationsComponent,
        UcpNotificationListComponent,
        UcpNotificationOptionsComponent,
        McpComponent,
        McpSidenavComponent,
        McpMainComponent,
        McpQueueUnapprovedComponent,
        McpQueueUnapprovedPostsComponent,
        McpQueueDeletedTopicsComponent,
        McpQueueDeletedPostsComponent,
        McpReportPmReportsComponent,
        McpReportPmReportsClosedComponent,
        McpReportReportsComponent,
        McpReportsClosedComponent,
        McpNotesMainComponent,
        McpWarnMainComponent,
        McpWarnListComponent,
        McpLogsMainComponent,
        McpBanUserComponent,
        McpBanUpComponent,
        McpBanEmailComponent,
        McpQuickmodTopicComponent,
        McpMainTopicComponent,
        McpMainForumComponent,
        McpMainForumTopicSelectComponent,
        McpMainMoveComponent,
    ],
    imports: [
        UIRouterModule.forRoot({
            states: STATES,
            config: PhpbbRoutingConfig
        }),
        BrowserModule.withServerTransition({ appId: 'scfr-forum' }),
        CommonModule,
        FormsModule,
        HttpModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MaterialModule,
        SCFRMaterialModule,
        FlexLayoutModule,
        LanguageModuleModule,
        ReCaptchaModule,
        HeaderModule,
        NgxChartsModule,
        ColorPickerModule,
    ],
    entryComponents: [
        DialogDeleteComponent, PopOutLoginComponent, UcpConfirmPopoutComponent, McpMainForumTopicSelectComponent, McpMainMoveComponent
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: environment.baseHref },
        PhpbbApiService, PhpbbFormHelperService, PhpbbService, LoginService, StateTranslate, PrivateMessageService,
        NotificationsService, PhpbbWebsocketService, WpService, HeaderService, ThrottlerService, ExtraModuleInjector
    ],
    bootstrap: [AppComponent],
})
export class SCFRForumModule {
    constructor(private injector: Injector) {
        ServiceLocator.injector = this.injector;
    }
}

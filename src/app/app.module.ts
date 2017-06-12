import { ViewconvoComponent } from './components/ucp/pm/viewconvo/viewconvo.component';
import { PrivateMessageService } from './services/private-message.service';
import { SCFRMaterialModule } from './material/material.module';
import { PmComponent } from './components/ucp/pm/pm.component';
import { UcpComponent } from './components/ucp/ucp.component';
import { ViewmessageComponent } from './components/viewmessage/viewmessage.component';
import { PhpbbRoot } from './components/phpbb/root/phpbb-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
        LoginComponent,
        PostingComponent,
        ViewmessageComponent,
        UcpComponent,
        PmComponent,
        ViewconvoComponent,
        BottomLoggedInComponent,
        MessageActionBarComponent,
        DialogDeleteComponent
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
    ],
    entryComponents: [
        DialogDeleteComponent
    ],
    providers: [PhpbbApiService, PhpbbService, LoginService, StateTranslate, PrivateMessageService],
    bootstrap: [AppComponent],
})
export class AppModule { }

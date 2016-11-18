import { PhpbbRoot } from './components/phpbb/root/phpbb-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from 'ui-router-ng2';

import { PhpbbApiService } from './services/phpbb-api.service';
import { PhpbbService } from './services/phpbb.service';
import { LoginService } from './services/login.service';
import { StateTranslate } from './services/state-translate.service';


import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';
import { MdSnackBar } from '@angular/material/snack-bar';

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
    ],
    imports: [
        UIRouterModule.forRoot({
            states: STATES,
            configClass: PhpbbRoutingConfig
        }),
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
    ],
    providers: [PhpbbApiService, PhpbbService, LoginService, StateTranslate,MdSnackBar],
    bootstrap: [AppComponent],
})
export class AppModule { }

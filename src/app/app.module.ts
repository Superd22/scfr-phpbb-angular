import { PhpbbRoot } from './component/phpbb/root/phpbb-root.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UIRouterModule } from 'ui-router-ng2';

import { PhpbbApiService } from './service/phpbb-api.service';
import { LoginService } from './service/login.service';
import { StateTranslate } from './service/state-translate.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { MaterialModule } from '@angular/material';

import { PhpbbRoutingConfig } from './config/phpbb-routing.config';

import { STATES } from './state/_.states';
import { ViewforumComponent } from './component/viewforum/viewforum.component';
import { ViewtopicComponent } from './component/viewtopic/viewtopic.component';
import { SeoUrlPipe } from './pipe/seo-url.pipe';
import { UnicodeToUtf8Pipe } from './pipe/unicode-to-utf8.pipe';

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
    providers: [PhpbbApiService, LoginService, StateTranslate],
    bootstrap: [AppComponent],
})
export class AppModule { }

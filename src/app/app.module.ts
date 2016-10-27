import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PhpbbApiService } from './service/phpbb-api.service';
import { LoginService } from './service/login.service';

import { AppComponent } from './app.component';
import { IndexComponent } from './component/index/index.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { MaterialModule } from '@angular/material';

@NgModule({
    declarations: [
        AppComponent,
        IndexComponent,
        NavigationComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot()
    ],
    providers: [PhpbbApiService, LoginService],
    bootstrap: [AppComponent]
})
export class AppModule { }

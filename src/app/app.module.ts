import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PhpbbApiService } from './phpbb-api.service';
import { IndexComponent } from './index/index.component';
import { NavigationComponent } from './navigation/navigation.component';
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
    providers: [PhpbbApiService],
    bootstrap: [AppComponent]
})
export class AppModule { }

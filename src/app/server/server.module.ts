import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SCFRForumModule } from "../app.module";
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from "../app.component";

@NgModule({
  imports: [
    ServerModule,
    SCFRForumModule
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppServerModule { }

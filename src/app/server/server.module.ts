import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppModule } from "../app.module";
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from "../app.component";

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ],
  declarations: [],
  bootstrap: [AppComponent]
})
export class AppServerModule { }

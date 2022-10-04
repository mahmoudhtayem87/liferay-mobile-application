import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SafeHtmlPipe } from './safe-html.pipe';

import { ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth-interceptor";
import { SecureImagePipe } from './secure-image.pipe';

@NgModule({
  declarations: [AppComponent, SafeHtmlPipe, SecureImagePipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule,HttpClientModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  exports: [
    SecureImagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

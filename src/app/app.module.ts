import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SafeHtmlPipe } from './safe-html.pipe';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./auth-interceptor";
import { SecureImagePipe } from './secure-image.pipe';
import {ArticleDetailsPage} from "./dxp/structure/details/details.page";
import {EmptyComponent} from "./shared/empty/empty.component";
import {ListPage} from "./dxp/structure/list/list.page";
import {CommonModule} from "@angular/common";
import {StructuresPage} from "./dxp/structure/structures/structures.page";
import {SitesPage} from "./dxp/sites/sites.page";
import {DashboardPage} from "./dxp/dashboard/dashboard.page";
import {LoginPage} from "./login/login.page";
import {RootPage} from "./dxp/documents/root/root.page";
import {SubfolderPage} from "./dxp/documents/subfolder/subfolder.page";
import {FileDetailsPage} from "./dxp/documents/details/details.page";
import {FormsListPage} from "./dxp/forms/list/list.page";
import {FormsSubmitPage} from "./dxp/forms/submit/submit.page";
import {ProductsRouterPage} from "./router/router.page";
import {FormlyFieldConfig, FormlyModule} from "@ngx-formly/core";
import {FormlyIonicModule} from "@ngx-formly/ionic";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.props.minLength} characters`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props.maxLength} characters`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be more than ${field.props.min}`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props.max}`;
}

@NgModule({
  declarations: [AppComponent, SafeHtmlPipe, SecureImagePipe,ArticleDetailsPage,SafeHtmlPipe,
    EmptyComponent,ListPage,StructuresPage,SitesPage,DashboardPage,LoginPage,
    RootPage,SubfolderPage,FileDetailsPage,FormsListPage,FormsSubmitPage,ProductsRouterPage],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    ReactiveFormsModule,HttpClientModule, CommonModule,
    FormsModule,FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),FormlyIonicModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  exports: [
    SecureImagePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

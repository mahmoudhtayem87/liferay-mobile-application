import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommerceRoutingModule } from './commerce-routing.module';
import {HomeComponent} from "./home/home.component";
import {ListComponent} from "./list/list.component";
import {ProductComponent} from "./product/product.component";
import {AccountsListComponent} from "./accounts/list/list.component";
import {ListCartComponent} from "./carts/list/list.component";
import {CurrentCartComponent} from "./carts/current/current.component";
import {SecureImagePipe} from "../secure-image.pipe";




@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CommerceRoutingModule
    ],
  declarations: [HomeComponent,ListComponent,ProductComponent,AccountsListComponent,ListCartComponent,CurrentCartComponent,SecureImagePipe]
})
export class CommerceModule {}

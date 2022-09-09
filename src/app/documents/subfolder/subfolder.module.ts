import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubfolderPageRoutingModule } from './subfolder-routing.module';

import { SubfolderPage } from './subfolder.page';
import {EmptyComponent} from "../../shared/empty/empty.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubfolderPageRoutingModule
  ],
  declarations: [SubfolderPage,EmptyComponent]
})
export class SubfolderPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RootPageRoutingModule } from './root-routing.module';

import { RootPage } from './root.page';
import {EmptyComponent} from '../../shared/empty/empty.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RootPageRoutingModule
  ],
  declarations: [RootPage,EmptyComponent]
})
export class RootPageModule {}

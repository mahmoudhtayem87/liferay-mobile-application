import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitesPageRoutingModule } from './sites-routing.module';

import { SitesPage } from './sites.page';
import {EmptyComponent} from '../shared/empty/empty.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitesPageRoutingModule
  ],
  declarations: [SitesPage,EmptyComponent]
})
export class SitesPageModule {}

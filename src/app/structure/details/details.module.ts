import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage } from './details.page';
import {SafeHtmlPipe} from "../../safe-html.pipe";
import {EmptyComponent}  from '../../shared/empty/empty.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule
  ],
  declarations: [DetailsPage,SafeHtmlPipe,EmptyComponent]
})
export class DetailsPageModule {}

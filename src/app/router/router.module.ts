import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RouterPageRoutingModule } from './router-routing.module';

import { RouterPage } from './router.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterPageRoutingModule
  ],
  declarations: [RouterPage]
})
export class RouterPageModule {}

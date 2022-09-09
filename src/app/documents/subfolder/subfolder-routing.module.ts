import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubfolderPage } from './subfolder.page';

const routes: Routes = [
  {
    path: '',
    component: SubfolderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubfolderPageRoutingModule {}

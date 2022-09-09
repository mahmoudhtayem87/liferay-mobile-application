import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SitesPage } from './sites.page';

const routes: Routes = [
  {
    path: '',
    component: SitesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SitesPageRoutingModule {}

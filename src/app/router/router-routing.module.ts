import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RouterPage } from './router.page';

const routes: Routes = [
  {
    path: '',
    component: RouterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RouterPageRoutingModule {}

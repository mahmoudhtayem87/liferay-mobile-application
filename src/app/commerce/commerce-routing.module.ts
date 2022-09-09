import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListComponent} from './list/list.component';
import {ProductComponent} from "./product/product.component";
import {CurrentCartComponent} from "./carts/current/current.component";
import {ListCartComponent} from "./carts/list/list.component";

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },  {
    path: 'list',
    component: ListComponent
  },  {
    path: 'product/:productId',
    component: ProductComponent
  },  {
    path: 'cart/:cartId',
    component: CurrentCartComponent
  },  {
    path: 'carts',
    component: ListCartComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommerceRoutingModule {}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../../liferay.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListCartComponent implements OnInit {



  items = [];
  carts = [];
  selectedAccountId = -1;
  selectedCartId = -1 ;
  loading: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Loading data..."
    });
    this.loading.present();
  }

  constructor(private route: ActivatedRoute,private router: Router, private  loadingController: LoadingController) {

  }
  ngOnInit() {
    this.loadDataCarts();
  }


  async loadDataCarts()
  {
    console.clear();
    await this.showLoading();
    this.carts = [];
    this.carts = await LiferayService.getCommerceCarts();
    this.carts = this.carts["items"];
    this.loading.dismiss();
  }
  cartSelected($event: any) {
    console.log(this.selectedCartId);
  }

  view(cart: any) {
    this.router.navigate([`/commerce/cart`,cart.id]);
  }
}

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../../liferay.service";
import {UtilityService} from "../../../utility.service";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss'],
})
export class CurrentCartComponent implements OnInit {


  items = [];
  cart = null;
  cartId: unknown = -1;
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

  get liferayService()
  {
    return LiferayService;
  }
  async loadDataCarts()
  {
    console.clear();
    await this.showLoading();
    this.cartId = await UtilityService.getParamValue(this.route,'cartId');
    this.cart = await LiferayService.getCart(this.cartId);
    console.log(this.cart);
    this.items = await LiferayService.getCartItems(this.cartId);
    this.items = this.items["items"];
    this.loading.dismiss();
  }
  get total()
  {
    if (this.cart!= null)
    return this.cart['summary']['totalFormatted'];
    else return "";
  }
  cartSelected($event: any) {
    console.log(this.selectedCartId);
  }

  view(cart: any) {

  }

}

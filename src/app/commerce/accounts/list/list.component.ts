import {Component, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../../liferay.service";


@Component({
  selector: 'commerce-accounts',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class AccountsListComponent implements OnInit {

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

  }

  async loadDataAccount()
  {
    await this.showLoading();
    this.items = [];
    this.items = await LiferayService.getCommerceAccounts();
    this.items = this.items["items"];
    this.selectedAccountId = LiferayService.portalInformation.currentAccountId;
    console.log(this.selectedAccountId);
    this.loading.dismiss();
  }
  async loadDataCarts()
  {
    await this.showLoading();
    this.carts = [];
    this.carts = await LiferayService.getCommerceCarts();
    //this.carts = this.items["items"];
    this.selectedCartId = LiferayService.portalInformation.currentCartId;
    console.log(this.selectedAccountId);
    this.loading.dismiss();
  }
  async accountSelected($event: any) {
    const accountId = $event.detail.value;
    LiferayService.portalInformation.currentAccountId = accountId;
    this.carts["items"] = [];
    this.selectedCartId = -1;
    await this.loadDataCarts();
    if (this.carts["totalCount"] === 0 )
    {
      await LiferayService.createCart();
      await this.loadDataCarts();
    }
    console.log(this.carts);
  }
  cartSelected($event: any) {
    console.log(this.selectedCartId);
    LiferayService.portalInformation.currentCartId = this.selectedCartId;

  }
}

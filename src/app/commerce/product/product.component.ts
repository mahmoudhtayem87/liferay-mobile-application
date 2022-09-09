import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../liferay.service";
import {UtilityService} from "../../utility.service";
import {AccountsListComponent} from "../accounts/list/list.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {

  productObj;
  productId: unknown = -1;
  productSKUs = [];
  loading: any;
  price = '';
  filePreview='';
  skuid = -1;
  @ViewChild(AccountsListComponent) child:AccountsListComponent;

  get accountId()
  {
    return LiferayService.portalInformation.currentAccountId;
  }
  get cartId()
  {
    return LiferayService.portalInformation.currentCartId;
  }
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:'loading',
      message:'Loading articles...'
    });
    this.loading.present();
  }
  constructor(private route: ActivatedRoute,private router: Router, private  loadingController: LoadingController) {
  }

  ngOnInit() {
    this.loadData();
  }
  async loadData()
  {
    await this.showLoading();
    this.productId = await UtilityService.getParamValue(this.route,'productId');
    this.productObj = await LiferayService.getProduct(this.productId);
    this.productSKUs = await LiferayService.getProductSKUs(this.productId);
    this.filePreview = LiferayService.fixCommerceImageUrl(this.productObj.urlImage);
    if (this.accountId === -1 || this.cartId === -1)
      this.child.loadDataAccount();
    this.loading.dismiss();
  }
  didNotLoad() {
    this.filePreview='./assets/images/noimage.png';
  }
  skuSelected($event: any) {
    console.log(this.productSKUs);
    console.log($event.detail.value);
    const sku = this.productSKUs['items'].filter(sku=>sku.id.toString() === $event.detail.value);
    console.log(sku);
    this.price = sku[0].price.priceFormatted;
    console.log($event);
  }


  async addToCart() {
    console.log("test");
    await this.showLoading();
    await LiferayService.addToCart(this.skuid);
    this.loading.dismiss();
  }
}

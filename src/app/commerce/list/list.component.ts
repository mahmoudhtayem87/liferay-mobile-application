import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../liferay.service";
import {UtilityService} from "../../utility.service";
import {AccountsListComponent} from "../accounts/list/list.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  items = [];
  loading: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Loading articles..."
    });
    this.loading.present();
  }
  constructor(private route: ActivatedRoute,private router: Router, private  loadingController: LoadingController) {
  }
  @ViewChild(AccountsListComponent) child:AccountsListComponent;

  ionViewDidEnter()
  {
    this.child.loadDataAccount();
  }
  ngOnInit() {
    this.loadData();
  }
  getImageUrl(url)
  {
    return LiferayService.fixCommerceImageUrl(url);
  }
  async loadData()
  {
    await this.showLoading();
    this.items = await LiferayService.getProducts();
    this.loading.dismiss();
  }
  viewProduct(id) {
    this.router.navigate([`/commerce/product`,id]);
  }

  get accountId()
  {
    return LiferayService.portalInformation.currentAccountId;
  }
  viewCarts() {
    this.router.navigate([`/commerce/carts`]);
  }
}

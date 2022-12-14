import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {UtilityService} from "../../../utility.service";
import {LiferayService} from "../../../liferay.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class FormsListPage implements OnInit {
  items = [];
  loading: any;
  isEmpty: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Loading forms..."
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
    this.isEmpty = false;
    await this.showLoading();
    this.items = await LiferayService.getForms();
    this.isEmpty = this.items.length>0 ? false:true;
    this.loading.dismiss();
  }
  viewForm(articleId)
  {
    this.router.navigate([`/forms/submit`,articleId]);
  }
}

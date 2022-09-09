import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilityService} from '../../utility.service';
import {LiferayService} from "../../liferay.service";
import {LoadingController} from "@ionic/angular";
@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

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

  ngOnInit() {
    this.loadData();
  }
  async loadData()
  {
    await this.showLoading();
    const strId = await UtilityService.getParamValue(this.route,'structureId');
    this.items = await LiferayService.getStructuredContent(strId);
    this.loading.dismiss();
  }
  viewArticle(articleId)
  {
    this.router.navigate([`/details`,articleId]);
  }
}

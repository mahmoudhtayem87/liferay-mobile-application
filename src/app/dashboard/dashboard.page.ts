import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {LiferayService} from "../liferay.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  loading: any;
  constructor(private loadingCtrl: LoadingController,private router: Router) { }
  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
      id:"loading_page"
    });
    this.loading.present();
  }
  ngOnInit() {
  }
  async loadingFunction()
  {
  }
  // eslint-disable-next-line @typescript-eslint/member-ordering,@typescript-eslint/naming-convention
  get Topics()
  {
    return LiferayService.portalInformation.StructuredConfigurations;
  }
  viewTopicArticles(structureId)
  {
    this.router.navigate([`/topicList`,structureId]);
  }

  visit(path: string) {
    this.router.navigate([`/${path}`]);
  }
}

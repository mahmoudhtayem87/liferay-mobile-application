import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UtilityService} from '../../utility.service';
import {LiferayService} from '../../liferay.service';
import {LoadingController} from "@ionic/angular";
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  articleId: unknown = '';
  templateId: unknown = '';
  article = {};
  templates= [];
  isTemplateSelected = false;
  hasDeletePermission = false;
  innerHTML = '';
  loading: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Loading article..."
    });
    this.loading.present();
  }
  constructor(private route: ActivatedRoute, private loadingController: LoadingController) { }
  ngOnInit() {
    this.loadItem();
  }
  async loadItem()
  {
    await this.showLoading();
    this.articleId = await UtilityService.getParamValue(this.route,'articleId');
    this.article = await LiferayService.getStructuredContentItem(this.articleId);
    this.templates = this.article["renderedContents"]
      .filter(item=>  item.renderedContentURL.indexOf('/rendered-content/') !== -1);
    this.loading.dismiss();
  }
  async  selectTemplate(event: any)
  {
    await this.showLoading();
    this.templateId = event.detail.value;
    this.isTemplateSelected = true;
    this.innerHTML = await LiferayService.getStructuredContentItemRendered(this.articleId,this.templateId);
    this.loading.dismiss();
  }
}

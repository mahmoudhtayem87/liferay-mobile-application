import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {UtilityService} from "../../../utility.service";
import {LiferayService} from "../../../liferay.service";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class FileDetailsPage implements OnInit {

  loading;
  fileId: unknown = -1;
  currentFile = null;
  filePreview= '';
  constructor(private route: ActivatedRoute,private router: Router, private  loadingController: LoadingController) { }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      id:"loading_page"
    });
    this.loading.present();
  }
  async loadData()
  {
    await this.showLoading();
    this.fileId = await UtilityService.getParamValue(this.route,'fileId');
    this.currentFile = await LiferayService.getFileInfo(this.fileId);
    this.filePreview = this.getfilePreview();
    this.loading.dismiss();
  }

  ngOnInit() {
    this.loadData();
  }

  getfilePreview()
  {
    if (this.currentFile["encodingFormat"].indexOf("application") != -1)
    {
      return `${LiferayService.portalInformation.url}/${this.currentFile["contentUrl"]}&previewFileIndex=1`;
    }else
    {
      console.log(this.currentFile);
      return `${LiferayService.portalInformation.url}/${this.currentFile["contentUrl"]}`;
    }
  }

  didNotLoad() {
    console.log("image did not load!");
    this.filePreview='./assets/images/noimage.png';
  }
}

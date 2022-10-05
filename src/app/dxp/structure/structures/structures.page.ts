import { Component, OnInit } from '@angular/core';
import {LiferayService} from "../../../liferay.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-structures',
  templateUrl: './structures.page.html',
  styleUrls: ['./structures.page.scss'],
})
export class StructuresPage implements OnInit {

  structures;
  isEmpty;
  loading: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Loading content types..."
    });
    this.loading.present();
  }
  constructor(private router: Router,private loadingController: LoadingController) { }
  ngOnInit() {
    this.loadData();
  }
  async loadData()
  {
    this.isEmpty = false;
    await this.showLoading();
    this.structures = await  LiferayService.getStructures(LiferayService.portalInformation.currentSite);
    this.isEmpty = this.structures.length > 0 ? false:true;
    this.loading.dismiss();
  }

  viewArticles(structureId) {
    this.router.navigate([`webcontent/topicList`,structureId]);
  }
}

import { Component, OnInit } from '@angular/core';
import {LiferayService} from "../../../liferay.service";
import {Router} from "@angular/router";
import {folder} from "ionicons/icons";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
})
export class RootPage implements OnInit {
  folders = [];
  files = [];
  loading;
  isEmpty: any;
  constructor(private router: Router, private  loadingController: LoadingController) { }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      id:"loading_page"
    });
    this.loading.present();
  }
  async loadRootFolders()
  {
    this.folders = await LiferayService.getRootFolders(LiferayService.portalInformation.currentSite);
  }
  async loadRootDocuments()
  {
    this.files = await LiferayService.getRootDocuments(LiferayService.portalInformation.currentSite);
  }
  async loadData()
  {
    await this.showLoading();
    await this.loadRootFolders();
    await this.loadRootDocuments();
    this.isEmpty = this.files.length > 0 || this.folders.length > 0 ? false : true;
    this.loading.dismiss();
  }
  ngOnInit() {
    this.loadData();
  }
  viewFolder(folder) {
    LiferayService.portalInformation.currentFolder = folder.name;
    this.router.navigate([`documents/subfolder`,folder.id]);
  }
  viewFile(file) {
    LiferayService.portalInformation.currentFolder = folder["name"];
    this.router.navigate([`documents/details`,file.id]);
  }

}

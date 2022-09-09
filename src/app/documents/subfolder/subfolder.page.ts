import { Component, OnInit } from '@angular/core';
import {LiferayService} from "../../liferay.service";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {UtilityService} from "../../utility.service";
import {folder} from "ionicons/icons";

@Component({
  selector: 'app-subfolder',
  templateUrl: './subfolder.page.html',
  styleUrls: ['./subfolder.page.scss'],
})
export class SubfolderPage implements OnInit {

  folderId: unknown = 'Loading...';
  folders = [];
  files = [];
  currentFolder = null;
  loading;
  constructor(private route: ActivatedRoute,private router: Router, private  loadingController: LoadingController) { }
  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      id:"loading_page"
    });
    this.loading.present();
  }
  async loadRootFolders()
  {
    this.folders = await LiferayService.getSubFolders(this.folderId);
  }
  async loadRootDocuments()
  {
    this.files = await LiferayService.getFolderDocuments(this.folderId);
  }
  async loadData()
  {
    await this.showLoading();
    this.folderId = await UtilityService.getParamValue(this.route,'folderId');
    this.currentFolder = await LiferayService.getFolderInfo(this.folderId);
    await this.loadRootFolders();
    await this.loadRootDocuments();
    this.loading.dismiss();
  }
  ngOnInit() {
    this.loadData();
  }
  get folderTitle()
  {
    return this.currentFolder["name"];

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

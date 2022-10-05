import { Component, OnInit } from '@angular/core';
import {LiferayService} from "../../liferay.service";
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";

@Component({
  selector: 'app-sites',
  templateUrl: './sites.page.html',
  styleUrls: ['./sites.page.scss'],
})
export class SitesPage implements OnInit {

  loading: any;
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Validating information!"
    });
    this.loading.present();
  }
  constructor(private router: Router,private loadingController: LoadingController) { }

  ngOnInit() {
  }
  get sites()
  {
    return LiferayService.portalInformation.userSites;
  }

  visit(id) {
    LiferayService.setSiteId(id);
    this.router.navigate(['/dashboard']);
  }
}

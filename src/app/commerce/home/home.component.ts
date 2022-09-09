import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {LiferayService} from "../../liferay.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {


  loading: any;
  channels = [];
  filePreview= '';
  async showLoading() {
    this.loading = await this.loadingController.create({
      id:"loading",
      message:"Validating information!"
    });
    this.loading.present();
  }
  constructor(private router: Router,private loadingController: LoadingController) { }

  ngOnInit() {
    this.loadData();
  }
  async loadData()
  {
    await this.showLoading();
    this.channels = await LiferayService.getChannels();
    this.loading.dismiss();
  }
  visit(channel) {
    LiferayService.portalInformation.currencyCode = channel.currencyCode;
    LiferayService.setChannelId(channel.id);
    this.router.navigate(['/commerce/list']);
  }
}

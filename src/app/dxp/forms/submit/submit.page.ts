import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingController} from "@ionic/angular";
import {UtilityService} from "../../../utility.service";
import {LiferayService} from "../../../liferay.service";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class FormsSubmitPage implements OnInit {

  loading;
  date;
  formId: unknown = -1;
  currentForm = null;
  filePreview = '';
  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [];
  datetimeFields  = [];
  constructor(private route: ActivatedRoute, private router: Router, private loadingController: LoadingController) {
  }

  async showLoading() {
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      id: "loading_page"
    });
    this.loading.present();
  }

  async loadData() {
    await this.showLoading();
    this.formId = await UtilityService.getParamValue(this.route, 'formId');
    this.currentForm = await LiferayService.getFormById(this.formId);
    await this.prepareFormJSON(this.currentForm.structure.formPages);
    console.log(this.datetimeFields);
    this.loading.dismiss();
  }

  async prepareFormJSON(formPages) {
    formPages.forEach(item => {
      item.formFields.forEach(async (field) => {
        const schemaField = await UtilityService.getFormFieldSchema(field);
        if (field["inputControl"] === 'date_time' || field["inputControl"] === 'date')
          {
            this.datetimeFields.push(field);
          }
        this.fields.push(schemaField);
      });
    });
  }

  ngOnInit() {
    this.loadData();
  }

  onSubmit(model) {
    if (!this.form.valid) {
      for(let i in this.form.controls) {
        this.form.controls[i].markAsTouched();
      }
      console.log("invalid form...");
      return false;
    }
    else {
      console.log(model);
      this.datetimeFields.forEach(item=>{
        console.log(item);
        if (model[item.name])
          model[item.name] = UtilityService.parseDate(model[item.name],item);
      });
      console.log(model);
      LiferayService.submitFormRecord(this.currentForm.id,UtilityService.prepareFormSubmitDataObject(model),this.currentForm.defaultLanguage);
      return true;
    }
  }
  clear() {
   this.form.reset();
  }
}

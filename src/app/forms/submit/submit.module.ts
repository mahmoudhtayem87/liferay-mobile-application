import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubmitPageRoutingModule } from './submit-routing.module';

import { SubmitPage } from './submit.page';
import { ReactiveFormsModule } from '@angular/forms';
import {FormlyFieldConfig, FormlyModule} from '@ngx-formly/core';
import { FormlyIonicModule } from '@ngx-formly/ionic';
import {EmptyComponent} from '../../shared/empty/empty.component';
import {TextComponent} from '../controls/text/text.component';
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function minLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `Should have atleast ${field.props.minLength} characters`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function maxLengthValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props.maxLength} characters`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function minValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be more than ${field.props.min}`;
}
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function maxValidationMessage(error: any, field: FormlyFieldConfig) {
  return `This value should be less than ${field.props.max}`;
}
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitPageRoutingModule,ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minLength', message: minLengthValidationMessage },
        { name: 'maxLength', message: maxLengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    })
    , FormlyIonicModule
  ],
  declarations: [SubmitPage,EmptyComponent,TextComponent]
})
export class SubmitPageModule {}

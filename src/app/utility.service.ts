import {Injectable} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  static parseDate(dateString,item) {
    let format = item.inputControl === 'date_time'?'yyyy-MM-dd\'T\'HH:mm:ssZ':'yyyy-MM-dd';
    let pipe = new DatePipe('en-US');
    console.log(dateString);
    const dateObj = Date.parse(dateString);
    return pipe.transform(dateObj,format);
  }

  static getFormFieldSchema(field) {
    switch (field.inputControl) {
      case 'text':
        return {
          key: field.name,
          type: 'input',
          props: {
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
          }
        };
      case 'select':
        return {
          key: field.name,
          type: 'select',
          props: {
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            description: field.tooltip,
            options: field.formFieldOptions,
          },
        };
      case 'numeric':
        return {
          key: field.name,
          type: 'input',
          templateOptions: {
            label:  field.label,
            type: 'number',
            required: field.required,
          }
        };
      case 'radio':
        return {
          key: field.name,
          type: 'radio',
          templateOptions: {
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            description: field.tooltip,
            options: field.formFieldOptions,
          }
        };
      case 'date':
        return {
          key: field.name,
          type: 'datetime',
          props: {
            label:  field.label,
            required: field.required,
            presentation: 'date',
            displayFormat:'yyyy-MM-dd'
          }
        };
      case 'date_time':
        return {
          key: field.name,
          type: 'datetime',
          props: {
            label:  field.label,
            required: field.required,
            presentation:'time-date',
            displayFormat:'yyyy-MM-dd HH:MM'
          }
        };
      case 'checkbox':
        return {
          key: field.name,
          type: 'toggle',
          props: {
            label:  field.label,
            required: field.required
          }
        };
      case 'rich_text':
        return {
          key: field.name,
          type: 'textarea',
          props: {
            label:  field.label,
            required: field.required
          }
        };
      case 'checkbox_multiple':
        return {
          key: field.name,
          type: 'select',
          props: {
            label: field.label,
            placeholder: field.placeholder,
            required: field.required,
            description: field.tooltip,
            options: field.formFieldOptions,
            multiple:true,
            interface:'action-sheet'
          },
        };
    }
  }
  static getParamValue(route: ActivatedRoute,param: string) {
    return new Promise((resolve, reject) => {
      try {
        route.params.subscribe(params => {
          resolve(params[param]);
        });
      } catch (ex) {
        reject(null);
      }
    });
  }
  static prepareFormSubmitDataObject(formData) {
    let dataObj = [];
    Object.keys(formData).forEach((key,cvalue)=>{
      dataObj.push({name:key,value:formData[key]});
    });
    return dataObj;
  }
}

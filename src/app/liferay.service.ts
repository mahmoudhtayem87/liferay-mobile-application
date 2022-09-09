import { Injectable } from '@angular/core';
import { Http ,HttpResponse} from '@capacitor-community/http';


@Injectable({
  providedIn: 'root'
})
export class LiferayService {
  static loggedIn  = false;
  static portalInformation = {
    url:'http://localhost:8080/',
    user:'mahmoud.tayem@liferay.com',
    password:'test123',
    configurationId:0,
    userInformationObject:{},
    userSites:[],
    currentSite:-1,
    currentChannel:-1,
    currentCartId:-1,
    currentAccountId:-1,
    currentFolder:'',
    currencyCode:'USD',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    StructuredConfigurations:[],
    mobileAppConfiguration: {}
  };
  constructor() { }

  static setSiteId(siteId)
  {
    this.portalInformation.currentSite = siteId;
  }
  static async getUserInformation() {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-admin-user/v1.0/my-user-account`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        this.loggedIn = true;
        this.portalInformation.userInformationObject = response.data;
        this.portalInformation.userSites = response.data.siteBriefs;
        return true;
      }
      else
      {
        this.loggedIn = false;
        return false;
      }
    }
    catch (exp)
    {
      console.log(exp);
      return false;
    }
  }
  static async getConfigurationArticle()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/structured-contents/${this.portalInformation.configurationId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        this.portalInformation.mobileAppConfiguration = response.data;
        console.log(this.portalInformation.mobileAppConfiguration);
        let contentFields = response.data.contentFields;
        let StructuredConfigurations = [];
        contentFields.forEach((item)=>{
          if (item.name === "StructuredConfigurations")
          {
            let Key = "";
            let Value = "";
            let Title = "";
            let Image = "";
            item.nestedContentFields.forEach((field)=>{
              switch (field.name)
              {
                case "Key":
                  Key = field.contentFieldValue.data;
                  break;
                case "Value":
                  Value = field.contentFieldValue.data;
                  break;
                case "Title":
                  Title = field.contentFieldValue.data;
                  break;
                case "Image":
                  Image = `${this.portalInformation.url}/${field.contentFieldValue.image.contentUrl}`;
                  break;
              }
            });
            StructuredConfigurations.push({
              key:Key,
              value:Value,
              title:Title,
              image:Image
            });
          }
        });
        this.portalInformation.StructuredConfigurations = StructuredConfigurations;
        return true;
      }else
      {
        return false;
      }
    }
    catch (exp)
    {
      console.log(exp);
      return false;
    }
  }
  static async getForms()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-form/v1.0/sites/${this.portalInformation.currentSite}/forms`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getStructures(siteId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/sites/${siteId}/content-structures`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getFormById(formId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-form/v1.0/forms/${formId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getStructuredContent(structureId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/content-structures/${structureId}/structured-contents`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getStructuredContentItem(articleId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/structured-contents/${articleId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getStructuredContentItemRendered(articleId,templateId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/structured-contents/${articleId}/rendered-content/${templateId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getRootDocuments(siteId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/sites/${siteId}/documents`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getFolderDocuments(folderId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/document-folders/${folderId}/documents`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getRootFolders(siteId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/sites/${siteId}/document-folders`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getSubFolders(parentFolderId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/document-folders/${parentFolderId}/document-folders`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getFolderInfo(folderId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/document-folders/${folderId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getFileInfo(fileId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-delivery/v1.0/documents/${fileId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async submitFormRecord(formId,formData,lang)
  {
    let dataObj = {
      draft: false,
      formFieldValues: formData,
    };

    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-form/v1.0/forms/${formId}/form-records`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` ,
          'Content-Type': 'application/json',
          'accept': 'application/json',
          'Accept-Language': `${lang.replace(
            '_',
            '-'
          )}`},
        data: JSON.stringify(dataObj)
      };
      const response: HttpResponse = await Http.post(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }

  // Commerce Endpoints
  static async setChannelId(id)
  {
    this.portalInformation.currentChannel = id;
  }
  static async getChannels()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-commerce-admin-channel/v1.0/channels`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getProducts()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-catalog/v1.0/channels/${this.portalInformation.currentChannel}/products`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data.items;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getProduct(productId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-catalog/v1.0/channels/${this.portalInformation.currentChannel}/products/${productId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getProductSKUs(productId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        // eslint-disable-next-line max-len
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-catalog/v1.0/channels/${this.portalInformation.currentChannel}/products/${productId}/skus`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getCommerceCarts()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        // eslint-disable-next-line max-len
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-cart/v1.0/channels/${this.portalInformation.currentChannel}/account/${this.portalInformation.currentAccountId}/carts`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
          return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getCommerceAccounts()
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        // eslint-disable-next-line max-len
        url: `${this.portalInformation.url}/o/headless-commerce-admin-account/v1.0/accounts`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getCartItems(cartId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        // eslint-disable-next-line max-len
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-cart/v1.0/carts/${cartId}/items`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async getCart(cartId)
  {
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        // eslint-disable-next-line max-len
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-cart/v1.0/carts/${cartId}`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { Authorization: `Basic ${encodedString}` }
      };
      const response: HttpResponse = await Http.get(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async createCart()
  {
    let dataObj = {
      "accountId": this.portalInformation.currentAccountId,
      "currencyCode": this.portalInformation.currencyCode
    };
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-cart/v1.0/channels/${this.portalInformation.currentChannel}/carts`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` ,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        data: JSON.stringify(dataObj)
      };
      const response: HttpResponse = await Http.post(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }
  static async addToCart(skuId)
  {
    let dataObj = {
      "quantity": "1",
      "skuId": skuId,
      options: "[]"
    };
    try {
      const encodedString = btoa(`${this.portalInformation.user}:${this.portalInformation.password}`);
      const options = {
        url: `${this.portalInformation.url}/o/headless-commerce-delivery-cart/v1.0/carts/${this.portalInformation.currentCartId}/items`,
        // eslint-disable-next-line @typescript-eslint/naming-convention
        headers: { 'Authorization': `Basic ${encodedString}` ,
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        data: JSON.stringify(dataObj)
      };
      const response: HttpResponse = await Http.post(options);
      if (response.status === 200)
      {
        return response.data;
      }else
      {
        return [];
      }
    }
    catch (exp)
    {
      return [];
    }
  }

  static fixCommerceImageUrl(url)
  {
    const imageUrl = url.toString().substring(url.indexOf('/o'),url.length);
    return this.portalInformation.url+'/'+ imageUrl;
  }
}

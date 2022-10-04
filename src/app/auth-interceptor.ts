import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Injectable} from "@angular/core";
import {LiferayService} from "./liferay.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const encodedString = btoa(`${LiferayService.portalInformation.user}:${LiferayService.portalInformation.password}`);
    console.log("intercepted");
    request = request.clone({
      setHeaders: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Authorization': `Basic ${encodedString}`
      }
    });

    return next.handle(request);
  }
}

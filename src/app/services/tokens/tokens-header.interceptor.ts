import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
export const TOKEN_NAME = 'jwt_text';

export class TokensHeaderInterceptor implements HttpInterceptor{

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== `${environment.apiUrl}/auth/user/logIn` && req.url !== `${environment.apiUrl}/auth/user/signUp`
      && req.url !== `${environment.apiUrl}/auth/user/reset/status` && !req.url.startsWith(`${environment.apiUrl}/auth/user/refresh`)
      && !req.url.startsWith(`${environment.apiUrl}/shop/stockProducts`)
      && !(req.url.startsWith(`${environment.apiUrl}/images/storage/file`) && req.method === 'GET')) {
      const clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer_' + localStorage.getItem(TOKEN_NAME))});
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }

}

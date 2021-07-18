import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {TokensService} from './tokens.service';
import {AuthService} from '../auth/auth.service';
import {Tokens} from '../../models/tokens/tokens.model';


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private tokensService: TokensService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== `${environment.apiUrl}/auth/user/logIn` && req.url !== `${environment.apiUrl}/auth/user/signUp`
      && req.url !== `${environment.apiUrl}/auth/user/reset/status` && req.url !== `${environment.apiUrl}/auth/user/refresh`){
      return next.handle(req).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403 || error.status === 500)) {
            if (this.tokensService.isAccessTokenExpired()) {
              if (this.tokensService.isTokensRefreshed()){
                return this.authService.refreshTokens(this.tokensService.getUserName(), this.tokensService.getRefreshToken())
                  .pipe(switchMap((tokens: Tokens) => {
                      this.tokensService.setTokens(tokens);
                      const clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer_' + tokens.accessToken)});
                      return next.handle(clonedRequest);
                  }),
                    catchError((error => throwError(error))));
              }
              else{
                return this.tokensService.newRefreshTokenEvent.pipe(switchMap(() => {
                  const accessToken = this.tokensService.getAccessToken();
                  const clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer_' + accessToken)});
                  return next.handle(clonedRequest);
                }));
              }
            }
            else{
              return next.handle(req);
            }
          } else {
            return throwError(error);
          }
        })
      );
    }else{
      return next.handle(req);
    }

  }
}

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, throwError} from "rxjs";
import {catchError, switchMap} from "rxjs/operators";
import {AuthorizationService} from "../authorization/authorization.service";
import {AuthenticationService} from "./authentication.service";
import {Token} from "../../models/token.model";
import {environment} from "../../../environments/environment";


@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(private authorizationService: AuthorizationService, private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url != environment.apiUrl + '/api/auth/logIn' && req.url != environment.apiUrl + '/api/auth/signUp'
      && req.url != environment.apiUrl + '/api/stockProducts' && req.url != environment.apiUrl + '/api/auth/refresh'){
      return next.handle(req).pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403 || error.status === 500)) {
            return this.authorizationService.sendRefreshTokensRequest()
              .pipe(switchMap((tokens: Token) => {
                this.authenticationService.setAccessToken(tokens.accessToken);
                this.authenticationService.setRefreshToken(tokens.refreshToken);
                const clonedRequest = req.clone({headers: req.headers.set('Authorization', 'Bearer_' + tokens.accessToken)});
                return next.handle(clonedRequest)
              }),
                catchError((error => throwError(error))))
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

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../authentication/authentication.service";
import {FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {catchError, mergeMap} from "rxjs/operators";
import {Token} from "../../models/token.model";
import {environment} from "../../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http:HttpClient, private authenticationService: AuthenticationService) { }

  public sendLogInUserRequest(logInForm: FormGroup): Promise<Object>{
    return this.http.post(environment.apiUrl + '/api/auth/logIn', logInForm).toPromise();
  }
  public sendSignUpUserRequest(signUpForm: FormGroup): Promise<Object>{
    return this.http.post(environment.apiUrl + '/api/auth/signUp', signUpForm).toPromise();
  }

  public sendRefreshTokensRequestInterceptor(request: Observable<Object>): Promise<Object>{
    if(this.authenticationService.isAccessTokenExpired()){
      return this.http.post(environment.apiUrl + "/api/auth/refresh", this.authenticationService.getRefreshToken())
        .pipe(mergeMap((tokens: Token) => this.setNewTokensValue(request, tokens)),
          catchError((error) => {
            if(error.status === 403){
              this.authenticationService.deleteRefreshToken();
              this.authenticationService.deleteAccessToken();
              window.location.replace('/todolist')
              return error;
            }
          })).toPromise()
    }
    else{
      return request.toPromise();
    }
  }

  public setNewTokensValue(request: Observable<Object>, tokens: Token): Observable<Object>{
    this.authenticationService.setAccessToken(tokens.accessToken);
    this.authenticationService.setRefreshToken(tokens.refreshToken);
    return request;
  }
}




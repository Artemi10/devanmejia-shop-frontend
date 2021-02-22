import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  public sendLogInUserRequest(logInForm: FormGroup): Promise<any>{
    return this.http.post(environment.apiUrl + '/api/auth/logIn', logInForm).toPromise();
  }
  public sendSignUpUserRequest(signUpForm: FormGroup): Promise<any>{
    return this.http.post(environment.apiUrl + '/api/auth/signUp', signUpForm).toPromise();
  }
  public sendCheckCodeRequest(userCode): Promise<any>{
    return this.http.post(environment.apiUrl + '/api/verify/code', userCode).toPromise();
  }
  public sendRefreshTokensRequest(): Observable<any> {
    if (this.authenticationService.isAccessTokenExpired()) {
      return this.http.post(environment.apiUrl + '/api/auth/refresh', this.authenticationService.getRefreshToken());
    }
  }

}




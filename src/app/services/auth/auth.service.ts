import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TokensService} from '../tokens/tokens.service';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokensService: TokensService) { }

  public sendLogInUserRequest(logInForm: FormGroup): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/user/logIn', logInForm);
  }
  public sendSignUpUserRequest(signUpForm: FormGroup): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/user/signUp', signUpForm);
  }
  public sendCheckResetCodeRequest(userCode: string): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/check/reset-code', userCode);
  }
  public sendCheckCodeRequest(userCode: string): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/check/verify-code', userCode);
  }
  public updateVerifyCodeRequest(): Observable<any>{
    return this.http.get(environment.apiUrl + '/auth/user/verify-code');
  }
  public updateVerifyResetCodeRequest(): Observable<any>{
    return this.http.get(environment.apiUrl + '/auth/user/reset-code');
  }
  public resetPasswordRequest(login: string): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/user/reset/status', login);
  }
  public refreshTokens(login: string, refreshToken: string): Observable<any>{
    return this.http.post(`${environment.apiUrl}/auth/user/refresh/${login}`, refreshToken);
  }
  public updatePasswordRequest(newPassword: string): Observable<any>{
    return this.http.post(environment.apiUrl + '/auth/user/reset/password', newPassword);
  }
}

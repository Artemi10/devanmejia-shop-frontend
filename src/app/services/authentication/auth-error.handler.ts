import {ErrorHandler, Injectable} from '@angular/core';
import {AuthenticationService} from './authentication.service';
@Injectable()
export class AuthErrorHandler implements ErrorHandler{

  constructor(private authenticationService: AuthenticationService) {
  }

  handleError(error: any): void {
    if (error.status === 403 || error.status === 404 || error.status === 500){
      this.authenticationService.deleteAccessToken();
      this.authenticationService.deleteRefreshToken();
      window.location.replace('/');
    }
  }
}

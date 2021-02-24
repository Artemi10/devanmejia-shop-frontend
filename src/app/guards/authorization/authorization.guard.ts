import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authenticationService.isAccessTokenExisted() && !this.authenticationService.isAccessTokenExpired()
      && this.authenticationService.getUserRole() === 'ROLE_UNAUTHUSER'){
      this.router.navigate(['/checkCode']);
      return false;
    }
    if ((!this.authenticationService.isRefreshTokenExisted() && this.authenticationService.isAccessTokenExpired())
    || (!this.authenticationService.isRefreshTokenExisted() && !this.authenticationService.isAccessTokenExisted())) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }


}

import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }
  canActivate(): boolean {
    if ((this.authenticationService.isAccessTokenExisted() && !this.authenticationService.isAccessTokenExpired()
      && this.authenticationService.getUserRole() === 'ROLE_CLIENT')
    || (this.authenticationService.isRefreshTokenExisted())) {
      return true;
    }
    else {
      this.router.navigate(['/logIn']);
      return false;
    }

  }

}

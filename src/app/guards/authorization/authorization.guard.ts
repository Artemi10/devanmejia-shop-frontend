import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from "../../services/authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authenticationService:AuthenticationService, private router:Router) {
  }

  canActivate():boolean {
    if ((!this.authenticationService.isRefreshTokenExisted() && this.authenticationService.isAccessTokenExpired())
    || (!this.authenticationService.isRefreshTokenExisted() && !this.authenticationService.isAccessTokenExisted())) {
      return true;
    }
    else {
      this.router.navigate(['/'])
      return false;
    }
  }


}

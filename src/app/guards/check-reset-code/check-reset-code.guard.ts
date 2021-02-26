import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckResetCodeGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.authenticationService.isAccessTokenExisted() && !this.authenticationService.isAccessTokenExpired()
      &&  this.authenticationService.getUserRole() === 'ROLE_PASSWORD_RESET'){
      return true;
    }
    else{
      this.router.navigate(['/logIn']);
      return false;
    }
  }
}

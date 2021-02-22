import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthenticationService} from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CheckCodeGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }

  canActivate(): boolean {
    if (!this.authenticationService.isAccessTokenExisted()){
      this.router.navigate(['/logIn']);
      return false;
    }
    if (this.authenticationService.getUserRole() === 'ROLE_UNAUTHUSER'){
      return true;
    }
    else{
      this.router.navigate(['/logIn']);
      return false;
    }
  }

}
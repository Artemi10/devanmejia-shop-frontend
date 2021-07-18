import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokensService} from '../../services/tokens/tokens.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokensService: TokensService, private router: Router) {
  }

  canActivate(): boolean {
    if (this.tokensService.isAccessTokenExisted() && !this.tokensService.isAccessTokenExpired()
      && this.tokensService.getUserRole() === 'ROLE_UNAUTH_USER'){
      this.router.navigate(['/checkCode']);
      return false;
    }
    if ((!this.tokensService.isRefreshTokenExisted() && this.tokensService.isAccessTokenExpired())
    || (!this.tokensService.isRefreshTokenExisted() && !this.tokensService.isAccessTokenExisted())) {
      return true;
    }
    else {
      this.router.navigate(['/']);
      return false;
    }
  }


}

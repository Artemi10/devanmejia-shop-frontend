import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokensService} from '../../services/tokens/tokens.service';

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private router: Router, private tokensService: TokensService) {
  }
  canActivate(): boolean {
    if ((this.tokensService.isAccessTokenExisted() && !this.tokensService.isAccessTokenExpired()
      && this.tokensService.getUserRole() === 'ROLE_USER')
    || (this.tokensService.isRefreshTokenExisted())) {
      return true;
    }
    else {
      this.router.navigate(['/logIn']);
      return false;
    }

  }

}

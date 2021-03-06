import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TokensService} from '../../services/tokens/tokens.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordGuard implements CanActivate {


  constructor(private tokensService: TokensService, private router: Router) {}

  canActivate(): boolean {
    if (this.tokensService.isAccessTokenExisted() && !this.tokensService.isAccessTokenExpired()
      && this.tokensService.getUserRole() === 'ROLE_CHANGE_PASSWORD'){
      return true;
    }
    else{
      this.router.navigate(['/logIn']);
      return false;
    }
  }

}

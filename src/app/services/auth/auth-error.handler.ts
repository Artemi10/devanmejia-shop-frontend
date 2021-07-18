import {ErrorHandler, Injectable} from '@angular/core';
import {TokensService} from '../tokens/tokens.service';
import {Router} from '@angular/router';
@Injectable()
export class AuthErrorHandler implements ErrorHandler{

  constructor(private tokensService: TokensService, private router: Router) {
  }

  handleError(error: any): void {
    if (error.status === 403 || error.status === 500){
      this.tokensService.deleteAccessToken();
      this.tokensService.deleteRefreshToken();
      this.router.navigate(['/']);
    }
  }
}

import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {TokensService} from '../../../services/tokens/tokens.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private tokensService: TokensService, private router: Router){}

  public isExisted(): boolean{
    return (this.tokensService.isAccessTokenExisted() && !this.tokensService.isAccessTokenExpired()
      && this.tokensService.getUserRole() === 'ROLE_USER') || this.tokensService.isRefreshTokenExisted();
  }
  public isCurrentPage(url: string): boolean{
    return this.router.url === url;
  }

  public logOut(): void{
    this.tokensService.deleteRefreshToken();
    this.tokensService.deleteAccessToken();
    this.router.navigate(['/']);
  }





}

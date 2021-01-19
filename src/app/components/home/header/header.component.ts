import {Component, Injector} from '@angular/core';
import {AuthenticationService} from "../../../services/authentication/authentication.service";
import {OrdersService} from "../../../services/orders/orders.service";
import {Order} from "../../../models/order.model";
import {ActiveOrder} from "../../../services/active-order/active-order.service";
import {Route, Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private authenticationService:AuthenticationService, private router: Router){}

  public isExisted(): boolean{
    return (this.authenticationService.isAccessTokenExisted() &&!this.authenticationService.isAccessTokenExpired() &&this.authenticationService.getUserRole() === "ROLE_CLIENT")
      || this.authenticationService.isRefreshTokenExisted()
  }
  public isHomePage(): boolean{
    return this.router.url === '/';
  }

  public logOut(): void{
    this.authenticationService.deleteRefreshToken();
    this.authenticationService.deleteAccessToken();
    window.location.replace("/");
  }





}

import {Component, Input, OnInit} from '@angular/core';
import {StockProduct} from "../../../../models/stock-product.model";
import {AuthenticationService} from "../../../../services/authentication/authentication.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent{
  @Input() public stockProduct: StockProduct;
  public isPopUpOpened: boolean;

  constructor(private authenticationService: AuthenticationService) {
    this.isPopUpOpened = false;
  }

  public isClientAuthenticated(): boolean{
    return (this.authenticationService.isAccessTokenExisted() &&!this.authenticationService.isAccessTokenExpired() &&this.authenticationService.getUserRole() === "ROLE_CLIENT")
      || this.authenticationService.isRefreshTokenExisted();
  }

  public addProductToShoppingCart(){
    if(this.isClientAuthenticated()){
      this.isPopUpOpened = true;
    }
    else{
      window.location.replace('/logIn')
    }
  }
  public clickClosePopUpButtonEventListener(){
    this.isPopUpOpened = false;
  }


}

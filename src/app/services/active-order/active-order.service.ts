import {Injectable, Injector} from '@angular/core';
import {CartProduct} from "../../models/cart-product.model";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class ActiveOrder {
  public cartProducts: CartProduct[] = [];

  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
    this.getCartsProductsFromActiveOrder();
  }

  public getCartsProductsFromActiveOrder(): void{
    this.authorizationService.sendRefreshTokensRequestInterceptor(this.http.get(environment.apiUrl + '/api/cartProduct/active'))
      .then((data: CartProduct[]) => this.cartProducts = data);
  }

  public findCartProductByName(cartProductName: string): CartProduct{
    for(let cartProduct of this.cartProducts){
      if(cartProduct.productName === cartProductName){
        return cartProduct;
      }
    }
    return null;
  }
}

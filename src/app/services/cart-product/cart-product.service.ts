import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CartProduct} from "../../models/cart-product.model";
import {environment} from "../../../environments/environment";
import {AuthorizationService} from "../authorization/authorization.service";

@Injectable({
  providedIn: 'root'
})
export class CartProductService {

  constructor(private http:HttpClient, private authorizationService: AuthorizationService) { }

  public getCartProductsFromOrder(orderId: number): Promise<Object>{
    return this.authorizationService
      .sendRefreshTokensRequestInterceptor(this.http.get(environment.apiUrl + `/api/cartProduct/${orderId}`));
  }

  public addProductToCart(productName: string, productAmount: number): Promise<Object>{
    return this.authorizationService
      .sendRefreshTokensRequestInterceptor(this.http.post(environment.apiUrl + '/api/cartProduct', {productName: productName, productAmount: productAmount}));
  }

  public addProduct(cartProduct:CartProduct){
    cartProduct.amount += 1;
  }
  public deleteProduct(cartProduct:CartProduct){
    cartProduct.amount -= 1;
    if(cartProduct.amount<0){
      cartProduct.amount=0;
    }
  }

}



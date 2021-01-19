import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderCartProducts} from "../../models/order-cart-products.model";
import {AuthorizationService} from "../authorization/authorization.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient, private authorizationService: AuthorizationService) {}

  public getOrders(): Promise<Object>{
    return this.authorizationService
      .sendRefreshTokensRequestInterceptor(this.http.get(environment.apiUrl + "/api/orders"));
  }

  public updateOrderByCartProducts(orderCartProducts: OrderCartProducts): Promise<Object>{
    return this.authorizationService
      .sendRefreshTokensRequestInterceptor(this.http.patch(environment.apiUrl +`api/orders/products`, orderCartProducts));
  }

}

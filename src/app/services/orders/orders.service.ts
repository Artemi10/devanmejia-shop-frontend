import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {OrderCartProducts} from "../../models/order-cart-products.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http:HttpClient) {}

  public getOrders(): Promise<Object>{
    return this.http.get(environment.apiUrl + "/api/orders").toPromise();
  }

  public updateOrderByCartProducts(orderCartProducts: OrderCartProducts): Promise<Object>{
    return this.http.patch(environment.apiUrl +`/api/orders/products`, orderCartProducts).toPromise();
  }

}

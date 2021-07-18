import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private static PAGE_ELEMENTS_AMOUNT = 5;

  constructor(private http: HttpClient) {}

  public getOrdersAmount(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/orders/amount`);
  }

  public getOrders(page: number): Observable<any>{
    const firstIndex = OrdersService.PAGE_ELEMENTS_AMOUNT * (page - 1);
    const lastIndex = OrdersService.PAGE_ELEMENTS_AMOUNT * page;
    return this.http.get(`${environment.apiUrl}/shop/orders/${firstIndex}/${lastIndex}`);
  }

  public makeOrder(orderId: number): Observable<any>{
    return this.http.patch(`${environment.apiUrl}/shop/order/${orderId}/status`, {});
  }

}

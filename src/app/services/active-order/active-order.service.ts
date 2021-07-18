import {Injectable, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveOrderService {
  public addProductToCartEvent = new EventEmitter();
  public createActiveOrderEvent = new EventEmitter();

  constructor(private http: HttpClient) {}

  public getCartProductsAmount(): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/order/active/cartProducts/amount`);
  }
  public getCartProductAmount(productName: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/order/active/cartProducts/amount/${productName}`);
  }
  public createNewActiveOrder(): Observable<any>{
    return this.http.post(`${environment.apiUrl}/shop/order/active`, {});
  }

  public setCartProductAmount(productName: string, newAmount: number): Observable<any>{
    const cartProduct = { productName, newAmount};
    return this.http.patch(`${environment.apiUrl}/shop/cartProduct`, cartProduct);
  }
}

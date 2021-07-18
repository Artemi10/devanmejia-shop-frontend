import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CartProductService {
  constructor(private http: HttpClient) { }

  public getCartProductsFromOrder(orderId: number): Observable<any>{
    return this.http.get(`${environment.apiUrl}/shop/order/${orderId}/cartProducts`);
  }
}



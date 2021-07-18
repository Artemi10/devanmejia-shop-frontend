import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product, Type} from '../../models/product/product.model';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductImagesService {

  constructor(private http: HttpClient) { }

  public getBasicImageURL(product: Product): string{
    let url = './assets/static/images/products/';

    switch (product.type){
      case Type.DAIRY:
        url += 'dairy-product-icon.png';
        break;
      case Type.DRINKS:
        url += 'drinks-product-icon.jpg';
        break;
      case Type.FRUITS:
        url += 'fruits-product-icon.jpg';
        break;
      case Type.SWEETS:
        url += 'sweets-product-icon.png';
        break;
      case Type.VEGETABLES:
        url += 'vegetable-product-icon.png';
        break;
    }
    return url;
  }

  public getProductImage(product: Product): Observable<any>{
    return this.http.get(`${environment.apiUrl}/images/storage/file/${product.name}`,  {responseType: 'text'});
  }
}

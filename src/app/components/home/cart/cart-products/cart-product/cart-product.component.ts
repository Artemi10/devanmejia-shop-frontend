import {Component, Input, OnInit} from '@angular/core';
import {CartProduct} from "../../../../../models/cart-product.model";
import {CartProductService} from "../../../../../services/cart-product/cart-product.service";

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input() public cartProduct: CartProduct;
  @Input() public orderStatus: string;
  constructor(public cartProductService: CartProductService) { }

  ngOnInit(): void {
  }

  isOrderActive(orderStatus:string):boolean{
    return orderStatus==='ACTIVE';
  }

}

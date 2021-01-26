import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartProductService} from "../../../../services/cart-product/cart-product.service";
import {CartProduct} from "../../../../models/cart-product.model";
import { OrderCartProducts} from "../../../../models/order-cart-products.model";

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnInit, OnChanges{
  @Input() public orderId: number;
  @Input() public orderStatus: string;
  @Input() public errorMessage: string;
  public cartProducts: CartProduct[] = [];
  @Output() public clickBuyButtonEvent = new EventEmitter();

  constructor(private cartProductService: CartProductService) {}

  ngOnInit(): void {
    this.cartProductService.getCartProductsFromOrder(this.orderId)
        .then((data: CartProduct[]) => this.cartProducts = data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cartProductService.getCartProductsFromOrder(changes.orderId.currentValue)
        .then((data: CartProduct[]) => this.cartProducts = data);
  }

  public isOrderActive(orderStatus:string):boolean{
    return orderStatus === 'ACTIVE';
  }

  public buyButtonClickListener():void{
    this.clickBuyButtonEvent.emit(new OrderCartProducts(this.orderId, this.cartProducts));
  }
}


import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CartProductService} from '../../../../services/cart-product/cart-product.service';
import {CartProduct} from '../../../../models/product/cart-product.model';
import {Order} from '../../../../models/order/order.model';

@Component({
  selector: 'app-cart-products',
  templateUrl: './cart-products.component.html',
  styleUrls: ['./cart-products.component.css']
})
export class CartProductsComponent implements OnChanges{
  @Input() public selectedOrder: Order;
  @Input() public errorMessage: string;
  @Output() public clickBuyButtonEvent = new EventEmitter();
  public cartProducts: CartProduct[] = [];
  public cartPrice = 0;
  public showLoading = true;

  constructor(private cartProductService: CartProductService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showLoading = true;
    this.cartPrice = 0;
    this.cartProductService.getCartProductsFromOrder(this.selectedOrder.id)
      .subscribe((cartProducts: CartProduct[]) => {
        this.cartProducts = cartProducts;
        this.cartPrice = this.getTotalCartPrice(cartProducts);
        this.showLoading = false;
      });
  }

  public isOrderActive(orderStatus: string): boolean{
    return orderStatus === 'ACTIVE';
  }

  public buyButtonClickListener(): void{
    this.clickBuyButtonEvent.emit(this.selectedOrder.id);
  }
  public changeCartPriceListener(price: number): void{
    this.cartPrice += price;
  }

  private getTotalCartPrice(cartProducts: CartProduct[]): number{
    return cartProducts.map((cartProduct: CartProduct) => cartProduct.amount * cartProduct.product.price)
      .reduce((price: number, accumulator: number) => accumulator + price);
  }
}


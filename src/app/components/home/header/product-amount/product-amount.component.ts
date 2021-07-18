import {Component, Input, OnInit} from '@angular/core';
import {ActiveOrderService} from '../../../../services/active-order/active-order.service';

@Component({
  selector: 'app-product-amount',
  templateUrl: './product-amount.component.html',
  styleUrls: ['./product-amount.component.css']
})
export class ProductAmountComponent implements OnInit {
  public cartProductAmount: number;

  constructor(private activeOrderService: ActiveOrderService) {}

  ngOnInit(): void {
    this.getCartProductAmount();
    this.activeOrderService.addProductToCartEvent
      .subscribe(() => this.getCartProductAmount());
    this.activeOrderService.addProductToCartEvent
      .subscribe((newAmount: number) => this.cartProductAmount += newAmount);
  }

  public getCartProductAmount(): void{
    this.activeOrderService.getCartProductsAmount()
      .subscribe((amount: number) => this.cartProductAmount = amount);
  }

}

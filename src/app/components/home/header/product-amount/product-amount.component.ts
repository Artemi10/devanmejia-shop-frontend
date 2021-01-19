import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActiveOrder} from "../../../../services/active-order/active-order.service";

@Component({
  selector: 'app-product-amount',
  templateUrl: './product-amount.component.html',
  styleUrls: ['./product-amount.component.css']
})
export class ProductAmountComponent implements OnInit {

  constructor(private activeOrder: ActiveOrder) { }

  ngOnInit(): void {
  }

  public getAllCartProductAmount(): number{
    let allCartProductAmount: number = 0;
    for(let cartProduct of this.activeOrder.cartProducts){
      allCartProductAmount += cartProduct.amount;
    }
    return allCartProductAmount;
  }

}

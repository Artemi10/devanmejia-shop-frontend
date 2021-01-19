import { Component} from '@angular/core';
import {Order} from "../../../models/order.model";
import {OrdersService} from "../../../services/orders/orders.service";
import {OrderCartProducts} from "../../../models/order-cart-products.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  public orders: Order[] = [];
  public selectedOrder: Order;
  public errorMessage: string;

  constructor(public ordersService: OrdersService) {
    this.errorMessage = '';
    this.updateOrders();
  }

  public chooseOrderEventListener(newCurrentOrder: Order){
    this.selectedOrder = newCurrentOrder;
  }
  public clickBuyButtonEventListener(orderCartProducts: OrderCartProducts){
    this.ordersService.updateOrderByCartProducts(orderCartProducts)
      .catch((error) => {
        if(error.status === 404){
          this.errorMessage = error.error;
        }
        else{
          this.errorMessage = '';
          this.updateOrders();
        }
      })
  }

  private updateOrders(){
    this.ordersService.getOrders().then((data: Order[]) => {
      this.orders = data;
      this.selectedOrder = this.findActiveOrder();
    })
  }

  private findActiveOrder(): Order{
    for(let order of this.orders){
      if(order.orderStatus === 'ACTIVE'){
        return order;
      }
    }
  }

}

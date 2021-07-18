import { Component} from '@angular/core';
import {Order} from '../../../models/order/order.model';
import {OrdersService} from '../../../services/orders/orders.service';
import {ActiveOrderService} from '../../../services/active-order/active-order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{
  private static ORDERS_PAGE_AMOUNT = 5;
  public pages: number[];
  public orders: Order[] = [];
  public selectedOrder: Order = null;
  public errorMessage = '';
  public showOrderList = true;
  public showCartProductsList = true;
  public pageNumber = 1;

  constructor(public ordersService: OrdersService, public activeOrderService: ActiveOrderService) {
    this.getOrders();
    this.getOrdersAmount();
    this.activeOrderService.createActiveOrderEvent
      .subscribe((order: Order) => {
        this.getOrdersAmount();
        this.getOrders();
      });
  }

  public chooseOrderEventListener(newCurrentOrder: Order): void{
    this.selectedOrder = newCurrentOrder;
  }
  public clickBuyButtonEventListener(orderId: number): void{
    this.ordersService.makeOrder(orderId)
      .subscribe(() => this.activeOrderService.createNewActiveOrder()
          .subscribe((order: Order) => {
            this.selectedOrder = order;
            this.activeOrderService.createActiveOrderEvent.emit(order);
          }),
          error => this.errorMessage = error.error);
  }

  private getOrders(): void{
    this.ordersService.getOrders(this.pageNumber)
      .subscribe((data: Order[]) => {
        this.orders = data;
        this.setSelectedOrder(data);
      });
  }
  private getOrdersAmount(): void{
    this.ordersService.getOrdersAmount()
      .subscribe((amount: number) => {
        const pagesAmount = Math.ceil(amount / CartComponent.ORDERS_PAGE_AMOUNT);
        this.pages = Array.from(Array(pagesAmount).keys());
      });
  }
  private setSelectedOrder(orders: Order[]): void{
    let order: Order = orders.find(element => element.status === 'ACTIVE');
    if (order === undefined) {
      order = orders[0];
    }
    this.selectedOrder = order;
  }

  public clickOrdersListButtonEventListener(): void{
    this.showOrderList = !this.showOrderList;
  }
  public clickCartProductButtonEventListener(): void{
    this.showCartProductsList = !this.showCartProductsList;
  }

  public onResize(event: any): void{
    if (event.target.innerWidth >= 768){
      this.showCartProductsList = true;
      this.showOrderList = true;
    }
  }

  public changePage(pageNumber: number): void{
    this.pageNumber = pageNumber;
    this.getOrders();
  }
}

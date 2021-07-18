import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Order} from '../../../../models/order/order.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent{
  @Input() public orders: Order[];
  @Output() public chooseOrderEvent = new EventEmitter();
  constructor() {}

  public chooseOrderEventListener(order: Order): void{
    this.chooseOrderEvent.emit(order);
  }
}



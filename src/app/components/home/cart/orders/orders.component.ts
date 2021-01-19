import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {OrdersService} from "../../../../services/orders/orders.service";
import {Order} from "../../../../models/order.model";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent{
  @Input() public orders: Order[];
  @Output() public chooseOrderEvent = new EventEmitter();
  constructor() {}

  public chooseOrderEventListener(order: Order){
    this.chooseOrderEvent.emit(order);
  }




}



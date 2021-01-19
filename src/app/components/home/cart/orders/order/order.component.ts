import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Order} from "../../../../../models/order.model";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() public order: Order;
  @Output() public chooseOrderEvent = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  public chooseOrderListener(){
    this.chooseOrderEvent.emit(this.order)
  }

}

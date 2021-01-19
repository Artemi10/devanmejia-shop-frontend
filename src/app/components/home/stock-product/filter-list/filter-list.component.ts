import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent implements OnInit {
  @Input() maxPriceValue: number;
  @Input() minPriceValue: number;
  @Output() changeRangePriceEvent = new EventEmitter();
  @Output() clickHighToLowSortButtonEvent = new EventEmitter();
  @Output() clickLowToHighSortButtonEvent = new EventEmitter();


  constructor() {}

  ngOnInit(): void {}

  public changeRangePriceEventListener(event: Event){
    this.changeRangePriceEvent.emit(event)
  }
  public clickHighToLowSortButtonEventListener(value: boolean){
    this.clickHighToLowSortButtonEvent.emit(value);
  }
  public clickLowToHighSortButtonEventListener(value: boolean){
    this.clickLowToHighSortButtonEvent.emit(value);
  }

}

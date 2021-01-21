import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent  {
  public isFilterListPriceOpen: boolean = false;
  public isFilterListPriceIconOpen: boolean = false;
  @Input() maxPriceValue: number;
  @Input() minPriceValue: number;
  @Output() changeRangePriceEvent = new EventEmitter();

  constructor() { }


  public clickIconListener(): void{
    if(this.isFilterListPriceIconOpen){
      this.isFilterListPriceIconOpen = false;
      this.isFilterListPriceOpen = false;
    }
    else{
      this.isFilterListPriceIconOpen = true;
      this.isFilterListPriceOpen = true;
    }
  }
  public changeRangeEventListener(event: Event){
    this.changeRangePriceEvent.emit(event)
  }

}

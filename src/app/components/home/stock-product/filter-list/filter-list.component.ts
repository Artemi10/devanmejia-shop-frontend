import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent {
  @Input() maxPriceValue: number;
  @Input() minPriceValue: number;
  @Output() changeRangePriceEvent = new EventEmitter();
  @Output() clickHighToLowSortButtonEvent = new EventEmitter();
  @Output() clickLowToHighSortButtonEvent = new EventEmitter();
  public showFilters: boolean;
  public showFiltersIcon: boolean


  constructor() {
    this.showFiltersIcon = window.innerWidth < 576;
    this.showFilters = !this.showFiltersIcon;
  }

  public changeRangePriceEventListener(event: Event){
    this.changeRangePriceEvent.emit(event)
  }
  public clickHighToLowSortButtonEventListener(value: boolean){
    this.clickHighToLowSortButtonEvent.emit(value);
  }
  public clickLowToHighSortButtonEventListener(value: boolean){
    this.clickLowToHighSortButtonEvent.emit(value);
  }
  public clickFiltersIconEventListener(){
    this.showFilters = !this.showFilters;
  }
  public onResize(event){
    if(event.target.innerWidth >= 576){
      this.showFilters = true;
      this.showFiltersIcon = false;
    }
    else{
      this.showFilters = false;
      this.showFiltersIcon = true;
    }
  }

}

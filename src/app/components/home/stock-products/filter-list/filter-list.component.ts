import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterParam, SortType} from '../../../../models/filter/filter-param.model';
import {Type} from '../../../../models/product/product.model';
import {PriceRange} from '../../../../models/filter/price-range.model';


@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.css']
})
export class FilterListComponent {
  public showFilters: boolean;
  public showFiltersIcon: boolean;
  @Input() filterParam: FilterParam;
  @Output() filterParamChange = new EventEmitter();


  constructor() {
    this.showFiltersIcon = window.innerWidth < 576;
    this.showFilters = !this.showFiltersIcon;
  }

  public changeRangePriceEventListener(range: PriceRange): void{
    this.filterParam.priceRange = range;
  }
  public changeCategoryTypesListener(typesStr: string[]): void{
    this.filterParam.productTypes = typesStr.map(type => Type[type.toUpperCase()]);
  }
  public clickHighToLowSortButtonEventListener(value: boolean): void{
    if (value){
      this.filterParam.sortType = SortType.HIGH_LOW;
    }
    else {
      this.filterParam.sortType = SortType.NONE;
    }
  }
  public clickLowToHighSortButtonEventListener(value: boolean): void{
    if (value){
      this.filterParam.sortType = SortType.LOW_HIGH;
    }
    else {
      this.filterParam.sortType = SortType.NONE;
    }
  }

  public clickFiltersIconEventListener(): void{
    this.showFilters = !this.showFilters;
  }

  public clickShowButtonListener(): void{
    this.filterParamChange.emit(this.filterParam);
  }

  public onResize(event): void{
    if (event.target.innerWidth >= 576){
      this.showFilters = true;
      this.showFiltersIcon = false;
    }
    else{
      this.showFilters = false;
      this.showFiltersIcon = true;
    }
  }

}

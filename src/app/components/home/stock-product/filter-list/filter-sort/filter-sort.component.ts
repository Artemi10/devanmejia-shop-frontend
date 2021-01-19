import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-filter-sort',
  templateUrl: './filter-sort.component.html',
  styleUrls: ['./filter-sort.component.css']
})
export class FilterSortComponent implements OnInit {
  public isFilterListSortTypesOpen: boolean = false;
  public isFilterListSortIconOpen: boolean = false;
  public isHighToLowCheckBoxSelected: boolean = false;
  public isLowToHighCheckBoxSelected: boolean = false;
  @Output() clickHighToLowSortButtonEvent = new EventEmitter();
  @Output() clickLowToHighSortButtonEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public clickIconListener(): void{
    if(this.isFilterListSortIconOpen){
      this.isFilterListSortIconOpen = false;
      this.isFilterListSortTypesOpen = false;
    }
    else{
      this.isFilterListSortIconOpen = true;
      this.isFilterListSortTypesOpen = true;
    }
  }
  public clickHighToLowTypeListener(): void{
    this.isHighToLowCheckBoxSelected = !this.isHighToLowCheckBoxSelected;
    this.isLowToHighCheckBoxSelected = false;
    // set true to sort; set false to delete sort
    if(this.isHighToLowCheckBoxSelected){
      this.clickHighToLowSortButtonEvent.emit(true);
    }
    else{
      this.clickHighToLowSortButtonEvent.emit(false);
    }
  }
  public clickLowToHighTypeListener(): void{
    this.isLowToHighCheckBoxSelected = !this.isLowToHighCheckBoxSelected;
    this.isHighToLowCheckBoxSelected = false;
    // set true to sort; set false to delete sort
    if(this.isLowToHighCheckBoxSelected){
      this.clickLowToHighSortButtonEvent.emit(true);
    }
    else{
      this.clickLowToHighSortButtonEvent.emit(false);
    }

  }


}

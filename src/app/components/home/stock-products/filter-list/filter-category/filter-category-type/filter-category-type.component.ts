import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-filter-category-type',
  templateUrl: './filter-category-type.component.html',
  styleUrls: ['./filter-category-type.component.css']
})
export class FilterCategoryTypeComponent implements OnInit {
  @Input() public typeName: string;
  public isCheckBoxSelected = true;
  @Output() setProductTypeEvent = new EventEmitter();
  @Output() deleteProductTypeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  public clickCategoryTypeListener(): void {
    this.isCheckBoxSelected = !this.isCheckBoxSelected;
    if (this.isCheckBoxSelected){
      this.setProductTypeEvent.emit();
    }else{
      this.deleteProductTypeEvent.emit();
    }
  }


}

import {Component, Input, OnInit} from '@angular/core';
import {StockProductService} from "../../../../../../services/stock-product/stock-product.service";

@Component({
  selector: 'app-filter-category-type',
  templateUrl: './filter-category-type.component.html',
  styleUrls: ['./filter-category-type.component.css']
})
export class FilterCategoryTypeComponent implements OnInit {
  @Input() public typeName: string;
  public isCheckBoxSelected: boolean = true;
  constructor(private stockProductService: StockProductService) { }

  ngOnInit(): void {}

  public clickCategoryTypeListener(): void {
    this.isCheckBoxSelected = !this.isCheckBoxSelected;
    if(this.isCheckBoxSelected){
      this.stockProductService.setStockProductsFilterByCategoryType(this.typeName.toUpperCase());
    }else{
      this.stockProductService.deleteStockProductsFilterByCategoryType(this.typeName.toUpperCase());
    }
  }


}

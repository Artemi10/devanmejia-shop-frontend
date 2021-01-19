import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnInit{
  public isFilterListCategoryTypesOpen: boolean = false;
  public isFilterListCategoryIconOpen: boolean = false;
  public categoryTypes: string[] = ['Vegetables', 'Dairy', 'Sweets', 'Drinks', 'Fruits'];

  constructor() { }

  ngOnInit(): void {
  }


  public clickIconListener(): void{
    if(this.isFilterListCategoryIconOpen){
      this.isFilterListCategoryIconOpen = false;
      this.isFilterListCategoryTypesOpen = false;
    }
    else{
      this.isFilterListCategoryIconOpen = true;
      this.isFilterListCategoryTypesOpen = true;
    }
  }
}

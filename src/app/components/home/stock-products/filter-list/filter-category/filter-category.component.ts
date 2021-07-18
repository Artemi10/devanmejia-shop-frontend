import {Component, EventEmitter, Output} from '@angular/core';
import {Type} from '../../../../../models/product/product.model';


@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent{
  public isFilterListCategoryIconOpen = false;
  public categoryTypes: string[];
  public selectedCategoryTypes: string[];
  @Output() categoryTypesChangeEvent = new EventEmitter();

  constructor() {
    this.categoryTypes = this.getAllProductTypes();
    this.selectedCategoryTypes = [...this.categoryTypes];
    this.categoryTypesChangeEvent.emit(this.selectedCategoryTypes);
  }

  public deleteProductTypeListener(type: string): void{
    const indexToDelete = this.selectedCategoryTypes.indexOf(type);
    this.selectedCategoryTypes.splice(indexToDelete, 1);
    this.categoryTypesChangeEvent.emit(this.selectedCategoryTypes);
  }

  public setProductTypeListener(type: string): void{
    this.selectedCategoryTypes.push(type);
    this.categoryTypesChangeEvent.emit(this.selectedCategoryTypes);
  }

  private getAllProductTypes(): string[]{
    return Object.keys(Type).map(type => type.toLowerCase())
      .map(type => type.charAt(0).toUpperCase() + type.slice(1));
  }

  public clickIconListener(): void{
    this.isFilterListCategoryIconOpen = !this.isFilterListCategoryIconOpen;
  }
}

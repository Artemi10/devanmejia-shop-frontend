import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategoryTypeComponent } from './filter-category-type.component';

describe('FilterCategoryTypeComponent', () => {
  let component: FilterCategoryTypeComponent;
  let fixture: ComponentFixture<FilterCategoryTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCategoryTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCategoryTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

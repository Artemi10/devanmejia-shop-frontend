import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTittleComponent } from './cart-tittle.component';

describe('CartTittleComponent', () => {
  let component: CartTittleComponent;
  let fixture: ComponentFixture<CartTittleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartTittleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTittleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

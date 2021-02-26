import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckResetCodeComponent } from './check-reset-code.component';

describe('CheckResetCodeComponent', () => {
  let component: CheckResetCodeComponent;
  let fixture: ComponentFixture<CheckResetCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckResetCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckResetCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

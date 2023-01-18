import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditEmployeeComponent } from './create-or-edit-employee.component';

describe('CreateOrEditEmployeeComponent', () => {
  let component: CreateOrEditEmployeeComponent;
  let fixture: ComponentFixture<CreateOrEditEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateOrEditEmployeeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

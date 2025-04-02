import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyTableAlertComponent } from './empty-table-alert.component';

describe('EmptyTableAlertComponent', () => {
  let component: EmptyTableAlertComponent;
  let fixture: ComponentFixture<EmptyTableAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyTableAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyTableAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

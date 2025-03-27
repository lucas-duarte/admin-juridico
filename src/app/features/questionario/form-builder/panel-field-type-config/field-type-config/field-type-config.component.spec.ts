import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTypeConfigComponent } from './field-type-config.component';

describe('FieldTypeConfigComponent', () => {
  let component: FieldTypeConfigComponent;
  let fixture: ComponentFixture<FieldTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldTypeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

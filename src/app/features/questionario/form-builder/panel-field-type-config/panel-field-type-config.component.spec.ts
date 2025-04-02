import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelFieldTypeConfigComponent } from './panel-field-type-config.component';

describe('PanelFieldTypeConfigComponent', () => {
  let component: PanelFieldTypeConfigComponent;
  let fixture: ComponentFixture<PanelFieldTypeConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelFieldTypeConfigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelFieldTypeConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPropriedadeComponent } from './form-propriedade.component';

describe('FormPropriedadeComponent', () => {
  let component: FormPropriedadeComponent;
  let fixture: ComponentFixture<FormPropriedadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormPropriedadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormPropriedadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTeseComponent } from './form-tese.component';

describe('FormTeseComponent', () => {
  let component: FormTeseComponent;
  let fixture: ComponentFixture<FormTeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTeseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormTeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

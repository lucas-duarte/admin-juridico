import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigExpressionComponent } from './config-expression.component';

describe('ConfigExpressionComponent', () => {
  let component: ConfigExpressionComponent;
  let fixture: ComponentFixture<ConfigExpressionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigExpressionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigExpressionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

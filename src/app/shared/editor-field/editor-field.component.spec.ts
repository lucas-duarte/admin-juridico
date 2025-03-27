import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorFieldComponent } from './editor-field.component';

describe('EditorFieldComponent', () => {
  let component: EditorFieldComponent;
  let fixture: ComponentFixture<EditorFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditorFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

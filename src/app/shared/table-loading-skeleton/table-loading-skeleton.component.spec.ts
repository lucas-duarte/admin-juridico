import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableLoadingSkeletonComponent } from './table-loading-skeleton.component';

describe('TableLoadingSkeletonComponent', () => {
  let component: TableLoadingSkeletonComponent;
  let fixture: ComponentFixture<TableLoadingSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableLoadingSkeletonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableLoadingSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

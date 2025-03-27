import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, Output, EventEmitter, OnDestroy, signal, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { TableLoadingSkeletonComponent } from "../../shared/table-loading-skeleton/table-loading-skeleton.component";
import { EmptyTableAlertComponent } from "../../shared/empty-table-alert/empty-table-alert.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-custom-table',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatSortModule,
    ReactiveFormsModule,
    TableLoadingSkeletonComponent,
    EmptyTableAlertComponent
  ],
  templateUrl: './custom-table.component.html',
  styleUrl: './custom-table.component.scss'
})
export class CustomTableComponent<T> implements OnInit, OnDestroy {

  @Input() title?: string;
  @Input() showRefreshButton = false;
  @Input() showAddButton = false;
  @Input() columns!: CustomTableColumn[];
  @Input() data: T[] = [];
  @Input() pageSize = 5;
  @Input() totalCount = 0;
  @Input() loading = false;
  @Input() filterPlaceholder = 'Pesquisar...';
  @Input() busy!: boolean;

  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() deleteItem = new EventEmitter<T>();
  @Output() refresh = new EventEmitter<void>();
  @Output() addNew = new EventEmitter<void>();
  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: MatTableDataSource<T> = new MatTableDataSource<T>();
  filterControl = new FormControl('');
  private subs = new Subscription();

  ngOnInit(): void {
    this.dataSource.data = this.data;
    this.subs.add(
      this.filterControl.valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(value => {
        this.applyFilter(value);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataSource.data = this.data;
    }
    // Se os ViewChild já estiverem definidos, atualize também paginator e sort
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(value: string | null) {
    this.dataSource.filter = (value ?? '').trim().toLowerCase();
  }

  handlePageEvent(event: PageEvent) {
    this.pageChange.emit(event);
  }

  handleSortChange(sortState: Sort) {
    this.sortChange.emit(sortState);
  }

  onRowClick(item: T) {
    this.rowClick.emit(item);
  }

  delete(item: T) {
    this.deleteItem.emit(item);
  }

  get displayedColumns(): string[] {
    return [...this.columns.map(c => c.key), 'action'];
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}

export interface CustomTableColumn {
  key: string;
  label: string;
  link: boolean;
  transform?: (value: any) => any;
}
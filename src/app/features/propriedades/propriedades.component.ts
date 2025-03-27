import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TableLoadingSkeletonComponent } from "../../shared/table-loading-skeleton/table-loading-skeleton.component";
import { EmptyTableAlertComponent } from "../../shared/empty-table-alert/empty-table-alert.component";
import { PropriedadeData } from '../../core/models/propriedade';
import { fadeInAnimation, fadeOutAnimation } from '../../core/constants/animations';
import { CustomTableComponent } from "../../shared/custom-table/custom-table.component";
import { PropriedadesService } from '../../core/services/propriedades/propriedades.service';
import { link } from 'fs';
import { DatePipe } from '@angular/common';
import { FormPropriedadeComponent } from './form-propriedade/form-propriedade.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-propriedades',
  imports: [
    CustomTableComponent
  ],
  templateUrl: './propriedades.component.html',
  styleUrl: './propriedades.component.scss',
  providers: [DatePipe, MatDialogModule],
  // animations: [fadeInAnimation, fadeOutAnimation]
})
export class PropriedadesComponent implements OnInit {

  propriedades: PropriedadeData[] = [];
  totalCount = 0;
  pageSize = 5;
  currentPage = 1;
  isLoadingResults = false;

  columns = [
    { key: 'rowKey', label: 'Row Key', link: true },
    { key: 'tipo', label: 'Tipo', link: false },
    { key: 'descricao', label: 'Descrição', link: false },
    { key: 'referencia', label: 'Referência', link: false },
    {
      key: 'timestamp',
      label: 'Data Criação',
      link: false,
      transform: (value: any) => this.datePipe.transform(value, 'dd/MM/yyyy')
    },
    { key: 'eTag', label: 'eTag', link: false },
  ];

  constructor(private propriedadesService: PropriedadesService, private datePipe: DatePipe, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPropriedades();
  }

  getPropriedades() {

    this.isLoadingResults = true;
    this.propriedadesService.getAll().subscribe({
      next: (response) => {
        this.propriedades = response.result;
        this.totalCount = response.result.length;
        this.isLoadingResults = false;

      },
      error(err) {
        console.log(err)
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getPropriedades();
  }

  onSortChange(sort: Sort) {
    // Lógica para atualizar a ordenação e recarregar os dados
    this.getPropriedades();
  }


  openEditDialog(propriedade?: PropriedadeData) {
    const dialogRef = this.dialog.open(FormPropriedadeComponent, {
      height: 'auto',
      minWidth: '800px',
      data: propriedade
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Atualize a tabela ou execute outra ação após o update
        console.log('Propriedade atualizada:', result);
        this.getPropriedades();
      }
    });
  }

  onDelete(item: PropriedadeData) {

    console.log('Excluir item:', item);
  }
}
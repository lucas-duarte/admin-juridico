import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { PropriedadeData } from '../../core/models/propriedade';
import { CustomTableComponent } from "../../shared/custom-table/custom-table.component";
import { PropriedadesService } from '../../core/services/propriedades/propriedades.service';
import { DatePipe } from '@angular/common';
import { FormPropriedadeComponent } from './form-propriedade/form-propriedade.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';

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

  constructor(private propriedadesService: PropriedadesService, private datePipe: DatePipe, private dialog: MatDialog, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.setHeader();
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

  setHeader(){
    this.toolbarService.emitterRoute.emit([
      { title: 'Propriedades', route: 'propriedades' }
    ]);
  }

  onDelete(item: PropriedadeData) {
    console.log('Excluir item:', item);
  }
}
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TeseData } from '../../core/models/tese';
<<<<<<< HEAD
import { TeseService } from '../../core/services/teste/tese.service';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';
import { Router } from '@angular/router';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';
=======
import { TeseService } from '../../core/services/tese/tese.service';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';
import { Router } from '@angular/router';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';
import { CreatePedidoComponent } from './create-pedido/create-pedido.component';
import { MatDialog } from '@angular/material/dialog';
>>>>>>> initalProject

@Component({
  selector: 'app-pedidos',
  imports: [CustomTableComponent],
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.scss'
})
export class PedidosComponent implements OnInit {

  teses: TeseData[] = [];
  totalCount = 0;
  pageSize = 5;
  currentPage = 1;
  isLoadingResults = false;

  columns = [
    { key: 'descricao', label: 'Descrição', link: true },
    { key: 'versao', label: 'Versão', link: false },
    { key: 'correcoes', label: 'Correções', link: false },
    { key: 'publicado', label: 'Publicado', link: false }
  ];

<<<<<<< HEAD
  constructor(private teseService: TeseService, private router: Router, private toolbarService: ToolbarService) { }
=======
  constructor(private teseService: TeseService, private router: Router, private toolbarService: ToolbarService, private dialog: MatDialog) { }
>>>>>>> initalProject

  ngOnInit(): void {
    this.getTeses();

    this.toolbarService.emitterRoute.emit([
      { title: 'Pedidos', route: 'pedidos'},
    ]);
  }

  getTeses() {
    this.isLoadingResults = true;
    this.teseService.getAll().subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.teses = response.result;
        }
        this.isLoadingResults = false;
      }, error(err) {
        console.log(err);
      }
    });
  }

  navigateToTese(tese?: TeseData) {
    this.router.navigate(['pedidos/form', tese?.rowKey]);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getTeses();
  }

  onSortChange(sort: Sort) {
    // Lógica para atualizar a ordenação e recarregar os dados
    this.getTeses();
  }

  onDelete(item: TeseData) {
    // Lógica para deletar o item
    console.log('Excluir item:', item);
  }
<<<<<<< HEAD
=======

  openCreatePedidoDialog(propriedade?: CreatePedidoComponent) {
      const dialogRef = this.dialog.open(CreatePedidoComponent, {
        height: 'auto',
        minWidth: '800px',
        data: propriedade
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Atualize a tabela ou execute outra ação após o update
          console.log('Tese atualizada:', result);
          this.getTeses();
        }
      });
    }
>>>>>>> initalProject
}
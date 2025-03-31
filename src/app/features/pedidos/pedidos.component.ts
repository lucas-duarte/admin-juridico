import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { TeseData } from '../../core/models/tese';
import { TeseService } from '../../core/services/teste/tese.service';
import { CustomTableComponent } from '../../shared/custom-table/custom-table.component';
import { Router } from '@angular/router';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';

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

  constructor(private teseService: TeseService, private router: Router, private toolbarService: ToolbarService) { }

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
}
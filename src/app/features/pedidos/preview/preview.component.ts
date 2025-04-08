import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormlyModule } from '@ngx-formly/core';
import { TeseService } from '../../../core/services/tese/tese.service';
import { TeseData } from '../../../core/models/tese';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../../core/services/loading/loading.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { DialogPreviewComponent } from './dialog-preview/dialog-preview.component';
import { ToolbarService } from '../../../core/services/toolbar/toolbar.service';

@Component({
  selector: 'app-preview',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormlyModule,
    MatIconModule,
  ],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss'
})
export class PreviewComponent implements OnInit {

  rowKey!: string;
  model = {};
  form = new FormGroup({});
  tese: TeseData = {} as TeseData;
  busy = false;
  schemaFields: any[] = [];

  readonly teseService = inject(TeseService);
  readonly dialog = inject(MatDialog);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);
  readonly snackbarService = inject(SnackbarService);
  readonly toolbarService = inject(ToolbarService);

  ngOnInit(): void {
    this.loadingService.show();
    this.rowKey = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getTese();
  }

  getTese() {

    this.busy = true;
    this.teseService.getById(this.rowKey).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
          this.setHeader();
          try {
            const parsed = JSON.parse(this.tese.questionarioAsJson || '[]') as any[];
            this.schemaFields = parsed.map(t => t.field);
          } catch (e) {
            console.error('Erro ao fazer parse do questionarioAsJson:', e);
          }

        }
        this.loadingService.hide();
      }, error: (err) => {
        this.busy = true;
        console.log(err)
        this.loadingService.hide();
      },
    })
  }

  setHeader(){
    this.toolbarService.emitterRoute.emit([
      { title: 'Pedidos', route: 'pedidos' },
      { title: `${this.tese.descricao}`, route: `form/${this.tese.rowKey}` },
      { title: `preview`, route: '', disabled: true },
    ]);
  }

  openDialogPreview(value: any): void {
    const dialogRef = this.dialog.open(DialogPreviewComponent, {
      data: value,
      width: '80vw',
      maxWidth: '100vw',
      height: 'auto',
      maxHeight: '100vh',
      panelClass: 'p-5'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {

      }
    });
  }

  submit(model: any) {
console.log(model)
    this.loadingService.show("Gerando pedido");    
    this.teseService.preview(this.rowKey, model).subscribe({
      next: (response) => {
        console.log(response)
        if(response){
          this.loadingService.hide();
          this.openDialogPreview(response)
        }
      },
      error: (response) => {
        console.log(response)
        this.loadingService.hide();
        this.snackbarService.simpleMessageError(response.error)
      },
    })
  }

  onNoClick(): void {
    this.router.navigate(['pedidos/form', this.rowKey])
  }
}

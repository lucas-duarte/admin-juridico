import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormlyModule } from '@ngx-formly/core';
import { TeseService } from '../../../core/services/teste/tese.service';
import { TeseData } from '../../../core/models/tese';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from '../../../core/services/loading/loading.service';

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

  ngOnInit(): void {
    this.rowKey = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getTese();
  }

  getTese() {
    this.loadingService.show();
    this.busy = true;
    this.teseService.getById(this.rowKey).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
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

  // openDialogPreview(): void {
  //   const dialogRef = this.dialog.open(PreviewComponent, {
  //     data: this.rowKey,
  //     maxWidth: '100%',
  //     width: '50vw',
  //     panelClass: 'p-5'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     if (result !== undefined) {

  //     }
  //   });
  // }

  submit(model: any) {
    console.log(model);
  }

  onNoClick(): void {
    this.router.navigate(['pedidos/form', this.rowKey])
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFieldProps, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatCardModule } from '@angular/material/card';
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RegrasData } from '../../core/models/regras';
import { FormBuilderService } from '../../core/services/form-builder/form-builder.service';
import { TeseData } from '../../core/models/tese';
import { TeseService } from '../../core/services/teste/tese.service';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/services/loading/loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-questionario',
  imports: [
    MatCardModule,
    FormBuilderComponent,
    //ReactiveFormsModule,
    // FormlyModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent implements OnInit {

  readonly formBuilderService = inject(FormBuilderService);
  readonly teseService = inject(TeseService);
  readonly toolbarService = inject(ToolbarService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);
  private _snackBar = inject(MatSnackBar);

  tese: TeseData = {} as TeseData;
  rowKey!: string;
  busy = false;

  ngOnInit(): void {
    this.loadingService.show();
    this.rowKey = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.getTese()
  }

  getTese() {
    this.busy = true;
    this.teseService.getById(this.rowKey).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
          this.toolbarService.emitterRoute.emit([
            { title: 'Pedidos', route: 'pedidos' },
            { title: `${this.tese.descricao}`, route: `form/${this.tese.rowKey}` },
            { title: `Questionário`, route: 'questionario' },
          ]);

          if (this.tese.questionarioAsJson && this.formBuilderService) {
            this.formBuilderService.loadFormFieldsFromJson(this.tese.questionarioAsJson);
          } else {
            this.formBuilderService.loadFormFieldsFromJson(JSON.stringify([]));
          }
        }

        this.busy = false;
        this.loadingService.hide();
      }, error: (err) => {
        this.busy = false;
        this.loadingService.hide();
        console.log(err)
      },
    })
  }

  cancel() {
    this.router.navigate([`pedidos/form/${this.tese.rowKey}`]);
  }

  submit() {

    this.loadingService.show();

    this.tese.questionarioAsJson = JSON.stringify(this.formBuilderService.formFields);

    this.teseService.update(this.rowKey, this.tese).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
        }
        this.loadingService.hide();
      }, error: (err) => {
        console.log(err)
        this.busy = false;
      },
    })
  }
}

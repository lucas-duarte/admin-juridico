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
<<<<<<< HEAD
import { TeseService } from '../../core/services/teste/tese.service';
=======
import { TeseService } from '../../core/services/tese/tese.service';
>>>>>>> initalProject
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../core/services/loading/loading.service';
import {MatSnackBar} from '@angular/material/snack-bar';
<<<<<<< HEAD
=======
import { SnackbarService } from '../../core/services/snackbar/snackbar.service';
>>>>>>> initalProject


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
<<<<<<< HEAD
  styleUrl: './questionario.component.scss'
=======
  styleUrl: './questionario.component.scss',
>>>>>>> initalProject
})
export class QuestionarioComponent implements OnInit {

  readonly formBuilderService = inject(FormBuilderService);
  readonly teseService = inject(TeseService);
  readonly toolbarService = inject(ToolbarService);
  readonly activatedRoute = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly loadingService = inject(LoadingService);
<<<<<<< HEAD
  private _snackBar = inject(MatSnackBar);
=======
  private snackbarService = inject(SnackbarService);
>>>>>>> initalProject

  tese: TeseData = {} as TeseData;
  rowKey!: string;
  busy = false;

<<<<<<< HEAD
  ngOnInit(): void {
    this.loadingService.show();
=======
constructor(){
  this.loadingService.show();
}

  ngOnInit(): void {
    
>>>>>>> initalProject
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
<<<<<<< HEAD
=======
          this.snackbarService.notificationSuccess("Questionario Salvo com sucesso!")
>>>>>>> initalProject
        }
        this.loadingService.hide();
      }, error: (err) => {
        console.log(err)
<<<<<<< HEAD
        this.busy = false;
=======
        this.snackbarService.notificationError(err);
        this.busy = false;
        this.loadingService.hide();
>>>>>>> initalProject
      },
    })
  }
}

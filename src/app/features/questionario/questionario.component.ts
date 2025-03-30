import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-questionario',
  imports: [
    MatCardModule,
    FormBuilderComponent,
    //ReactiveFormsModule,
    // FormlyModule,
    DragDropModule,
    MatDialogModule, MatButtonModule
  ],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {

  readonly dialogRef = inject(MatDialogRef<QuestionarioComponent>);
  readonly formBuilderService = inject(FormBuilderService);
  readonly tese = inject<RegrasData>(MAT_DIALOG_DATA) ?? {} as TeseData;

  onSubmit() {
    console.log(this.formBuilderService.formFields)
    this.dialogRef.close(this.formBuilderService.formFields);
  }
}

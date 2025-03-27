import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFieldProps, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatCardModule } from '@angular/material/card';
import { FormBuilderComponent } from "./form-builder/form-builder.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormlyMaterialModule } from '@ngx-formly/material';

@Component({
  selector: 'app-questionario',
  imports: [
    MatCardModule,
    FormBuilderComponent,
    //ReactiveFormsModule,
   // FormlyModule,
    DragDropModule
  ],
  templateUrl: './questionario.component.html',
  styleUrl: './questionario.component.scss'
})
export class QuestionarioComponent {

  form = new FormGroup({});
  model = {
    email: "lucas@gmail"
  };
  //FormlyFieldProps

  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'nome',
      type: 'input',
      props: {
        label: 'Nome',
        placeholder: 'TEu nome',
        required: true,
      }
    }
  ];

  onSubmit(model: any) {
    console.log(model);
  }
}

import { Component, ElementRef, HostListener } from '@angular/core';
import { FormContainerComponent } from "./form-container/form-container.component";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldTypeListComponent } from "./field-type-list/field-type-list.component";
import { FormBuilderService } from '../../../core/services/form-builder/form-builder.service';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PanelFieldTypeConfigComponent } from "./panel-field-type-config/panel-field-type-config.component";
import { FormlyModule } from '@ngx-formly/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-form-builder',  
  imports: [
    FormContainerComponent, 
    DragDropModule, 
    FieldTypeListComponent, 
    JsonPipe, 
    PanelFieldTypeConfigComponent, 
    FormlyModule, 
    ReactiveFormsModule, 
    MatSlideToggleModule,
    FormsModule
  ],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent {
  
  model = {};
  form = new FormGroup({});
  displayForm!: boolean
  
  constructor(private eRef: ElementRef, private fb: FormBuilderService) {
  }

  get schemaFields() {
    return this.fb.formFields.map(f => f.field);
  }

  onSubmit(model: any) {
    console.log(model);
  }
}

import { Component, importProvidersFrom, Input } from '@angular/core';
import { FormBuilderService } from '../../../../../core/services/form-builder/form-builder.service';
import { MatIconModule } from '@angular/material/icon';
import { FormlyModule } from '@ngx-formly/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-form-item',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    FormlyModule, 
    DragDropModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './form-item.component.html',
  styleUrl: './form-item.component.scss',
})
export class FormItemComponent {

  field: any;
  _formField: any;

  @Input()
  set formField(formField: any) {
    if (formField) {
      this.field = JSON.parse(JSON.stringify(formField.field)); // a hack to create a deep copy without references
      this._formField = formField;
    }
  }

  constructor(private fb: FormBuilderService) {
  }

  get active() {
    return this._formField?.active;
  }

  activate($event: any) {
    $event.stopPropagation(); // do not allow to propagate which triggers click out event
    this.fb.activateFormField(this._formField);
  }

  removeItem() {
    return this.fb.removeItem(this._formField);
  }

}

import { Component } from '@angular/core';
import { FormBuilderService } from '../../../../core/services/form-builder/form-builder.service';
import { FormItemComponent } from "./form-item/form-item.component";
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-form-container',
  imports: [FormItemComponent, DragDropModule],
  templateUrl: './form-container.component.html',
  styleUrl: './form-container.component.scss'
})
export class FormContainerComponent {

  constructor(private fb: FormBuilderService) { }

  get formFields() {
    return this.fb.formFields;
  }

  drop($event: any) {
    return this.fb.drop($event);
  }
}

import { CdkDragExit, CdkDragEnter, DragDropModule } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilderService } from '../../../../core/services/form-builder/form-builder.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { PropriedadesService } from '../../../../core/services/propriedades/propriedades.service';
import { PropriedadeData } from '../../../../core/models/propriedade';
import { CamelCaseToWordsPipe } from '../../../../core/pipes/camel-case-to-words';

@Component({
  selector: 'app-field-type-list',
  imports: [DragDropModule, MatIconModule, MatButtonModule, MatListModule, CamelCaseToWordsPipe],
  templateUrl: './field-type-list.component.html',
  styleUrl: './field-type-list.component.scss'
})
export class FieldTypeListComponent  {

  constructor(private formBuilder: FormBuilderService) {
  }

  get fields() {
    return this.formBuilder.fieldTypes;
  }

  get propriedades() {
    return this.formBuilder.propriedades;
  }

  drop($event: any) {
    this.formBuilder.drop($event)
  }

  noReturnPredicate() {
    return false
  }

  onSourceListExited(event: CdkDragExit<any>) {
    this.formBuilder.fieldTypes.splice(
      this.formBuilder.fieldTypes.indexOf(event.item.data) + 1,
      0,
      { ...event.item.data, temp: true }
    );
  }

  onSourceListEntered($event: CdkDragEnter<any>) {
    this.formBuilder.removeTempFields();
  }

}
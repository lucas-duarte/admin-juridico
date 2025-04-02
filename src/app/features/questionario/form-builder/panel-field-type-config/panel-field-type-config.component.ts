import { Component, ElementRef, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilderService } from '../../../../core/services/form-builder/form-builder.service';
import { AsyncPipe } from '@angular/common';
import { FieldTypeConfigComponent } from './field-type-config/field-type-config.component';

@Component({
  selector: 'app-panel-field-type-config',
  imports: [FieldTypeConfigComponent, AsyncPipe],
  templateUrl: './panel-field-type-config.component.html',
  styleUrl: './panel-field-type-config.component.scss'
})
export class PanelFieldTypeConfigComponent  {

  activeView$: BehaviorSubject<string> = new BehaviorSubject('field-type-list');

  formField: any

  constructor(private eRef: ElementRef, private fb: FormBuilderService) {
    this.fb.activeFormField$.subscribe((formField) => {
      this.formField = formField
      if (formField) {
        this.activeView$.next('field-type-config');
      } else {
        this.activeView$.next('field-type-list');
      }
    });
  }

  // @HostListener('document:click', ['$event'])
  // clickOutsidePanel(event:any) {
  //   if(!this.eRef.nativeElement.contains(event.target)) {
  //     this.fb.deactivateFormField();
  //   }
  // }

}

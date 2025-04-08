import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'date-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    FormlyModule,
    FormlyMaterialModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [provideNgxMask()],
  template: `
    <mat-form-field class="w-100">
      <mat-label>{{ label }}</mat-label>
      <input matInput type="text"
             [formControl]="formControl"
             [formlyAttributes]="field"
             [mask]="'00/00/0000'"
             [dropSpecialCharacters]="false"
             [placeholder]="placeholder">
      <mat-hint>{{ description }}</mat-hint>
    </mat-form-field>
  `,
})
export class DateField extends FieldType<FieldTypeConfig> {
  get placeholder() {
    return this.props.placeholder ?? 'dd/mm/aaaa';
  }

  get label() {
    return this.props.label ?? '';
  }

  get description() {
    return this.props.description ?? '';
  }
}

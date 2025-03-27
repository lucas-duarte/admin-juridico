import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { FormlyMaterialModule } from '@ngx-formly/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'monetario-field',
    imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective, FormlyModule, FormlyMaterialModule, MatFormFieldModule, MatInputModule],
    providers: [
        provideNgxMask()
    ],
    template: `
     <mat-form-field class="w-100">
        <mat-label>{{label}}</mat-label>
        <input matInput type="text"
           [formControl]="formControl"
           [formlyAttributes]="field"
           [mask]="'separator.2'"
           prefix="R$ "
           thousandSeparator="."
           decimalMarker=","
           [placeholder]="placeholder"
           >
           <mat-hint>{{description}}</mat-hint>
    </mat-form-field>
  `,
})
export class MonetarioField extends FieldType<FieldTypeConfig> {

    get placeholder() {
        return this.props.placeholder ?? 'R$ 0,00'
    }

    get label(){
        return this.props.label ?? ''
    }

    get description(){
        return this.props.description ?? ''
    }
 }
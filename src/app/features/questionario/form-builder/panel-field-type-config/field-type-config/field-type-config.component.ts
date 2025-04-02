import { ChangeDetectionStrategy, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Subject, takeUntil, debounceTime, BehaviorSubject } from 'rxjs';
import { FormBuilderService } from '../../../../../core/services/form-builder/form-builder.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { ExpressionComponent } from "./expression/expression.component";

@Component({
  selector: 'app-field-type-config',
  imports: [MatTabsModule, MatFormFieldModule, MatCheckboxModule, ReactiveFormsModule, MatInputModule, ExpressionComponent],
  templateUrl: './field-type-config.component.html',
  styleUrl: './field-type-config.component.scss',
})
export class FieldTypeConfigComponent implements OnInit, OnDestroy {

  form: any;
  private destroy$ = new Subject<void>();
  activeField: any; // Armazena o campo ativo atual

  constructor(private fb: FormBuilder, private fbs: FormBuilderService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      key: [''],
      'props': this.fb.group({
        'label': [''],
        'placeholder': [''],
        'description': [''],
        'disabled': [''],
        'required': ['']
      })
    });


    this.fbs.activeFormField$
      .pipe(takeUntil(this.destroy$))
      .subscribe(formField => {
        this.activeField = formField;
        if (formField) {
          
          // Inicializa o formulário com os dados do campo ativo sem emitir eventos
          this.form.patchValue(formField.field, { emitEvent: false });
        }
      });

    // Inscreva-se uma única vez às mudanças do formulário
    this.form.valueChanges
      .pipe(
        debounceTime(200),
        takeUntil(this.destroy$)
      )
      .subscribe((val: any) => {
        if (this.activeField) {
          const field = this.activeField.field;
          Object.assign(field.props, val.props);
          field.id = val.id;
          field.key = val.name;
        }
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


// interface Props {
//   label: string;
//   placeholder: string;
//   description: string;
//   disabled: boolean;
//   required: boolean;
// }

// interface FieldConfig {
//   id: string;
//   name: string;
//   props: Props;
// }
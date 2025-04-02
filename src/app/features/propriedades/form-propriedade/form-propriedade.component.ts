import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PropriedadeData } from '../../../core/models/propriedade';
import { PropriedadesService } from '../../../core/services/propriedades/propriedades.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-form-propriedade',
  templateUrl: './form-propriedade.component.html',
  styleUrls: ['./form-propriedade.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class FormPropriedadeComponent implements OnInit {
  form: FormGroup;
  loading = false;
  tipoPropriedades = ['String', 'Area', 'Guid', 'Int', 'DateTime', 'Boolean', 'Double', 'Money'];
  isEditMode:boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FormPropriedadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropriedadeData | null,
    private propriedadesService: PropriedadesService
  ) {

    this.isEditMode = !!(data && data.rowKey);

    this.form = this.fb.group({
      tipo: [data?.tipo || '', Validators.required],
      descricao: [data?.descricao || '', Validators.required],
      referencia: [data?.referencia || ''],
      rowKey: [{ value: data?.rowKey || '', disabled: this.isEditMode }, Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) { return; }
    this.loading = true;
    
    if (this.isEditMode) {
      const id = this.data!.rowKey;
      const updatedData: PropriedadeData = { ...this.data!, ...this.form.getRawValue() };
      this.propriedadesService.update(id, updatedData).subscribe({
        next: response => { this.loading = false; this.dialogRef.close(response); },
        error: err => { console.error('Erro ao atualizar a propriedade:', err); this.loading = false; }
      });
    } else {
      this.propriedadesService.create(this.form.value).subscribe({
        next: response => { this.loading = false; this.dialogRef.close(response); },
        error: err => { console.error('Erro ao criar a propriedade:', err); this.loading = false; }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { CommonModule, } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TeseData } from '../../../core/models/tese';
import { TeseService } from '../../../core/services/tese/tese.service';
import { PropriedadeData } from '../../../core/models/propriedade';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pedido',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule
  ],
  templateUrl: './create-pedido.component.html',
  styleUrl: './create-pedido.component.scss'
})
export class CreatePedidoComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreatePedidoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeseData | null,
    private teseService: TeseService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {

    this.form = this.fb.group({
      descricao: [data?.descricao || '', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.form.invalid) { return; }

    this.teseService.create(this.form.value).subscribe({
      next: response => {
        console.log(response)
        this.snackbarService.notificationSuccess("Pedido criado com sucesso!")
        this.router.navigate(['pedidos/form', response.result.rowKey])
       },
      error: err => { console.error('Erro ao criar a propriedade:', err); }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-regra',
  imports: [CommonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './regra.component.html',
  styleUrl: './regra.component.scss'
})
export class RegraComponent {

  form: FormGroup;

  campos = ['status', 'valor', 'data'];

  operadores = [
    { label: 'Igual', value: 'eq' },
    { label: 'Diferente', value: 'neq' },
    { label: 'Maior que', value: 'gt' },
    { label: 'Maior ou igual a', value: 'ge' },
    { label: 'Menor que', value: 'lt' },
    { label: 'Menor ou igual a', value: 'let' }
  ];

  condicoes = [
    { label: 'E', value: 'and' },
    { label: 'OU', value: 'or' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      filtros: this.fb.array([this.novoFiltro()])
    });
  }

  get filtros() {
    return this.form.get('filtros') as FormArray;
  }

  novoFiltro() {
    return this.fb.group({
      campo: ['', Validators.required],
      operador: ['', Validators.required],
      valor: ['', Validators.required],
      condicao: ['']
    });
  }

  adicionarFiltro() {
    this.filtros.push(this.novoFiltro());
  }

  removerFiltro(index: number) {
    this.filtros.removeAt(index);
  }

  gerarOdataQuery(): string {
    const filtros = this.filtros.value;
    return filtros.map((f: any, index: number) => {
      const val = isNaN(f.valor) ? `'${f.valor}'` : f.valor;
      const cond = index < filtros.length - 1 ? ` ${f.condicao} ` : '';
      return `${f.campo} ${f.operador} ${val}${cond}`;
    }).join('');
  }
}

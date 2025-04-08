import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilderService } from '../../../../core/services/form-builder/form-builder.service';
import { CamelCaseToWordsPipe } from '../../../../core/pipes/camel-case-to-words';
import { RegrasData } from '../../../../core/models/regras';

@Component({
  selector: 'app-regra',
  imports: [CommonModule, MatIconModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, CamelCaseToWordsPipe],
  templateUrl: './regra.component.html',
  styleUrl: './regra.component.scss'
})
export class RegraComponent {

  @Input() regra!: RegrasData;
  @Output() regraUpdated = new EventEmitter<string>();
  readonly formBuilderService = inject(FormBuilderService);

  form: FormGroup;

  get campos() {

    const fieldKeys  = this.formBuilderService.formFields.map(item => item.field.key);
    return  this.formBuilderService.allPropriedades.filter(p => fieldKeys.includes(p.rowKey));
  }

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

    this.form.valueChanges.subscribe(() => {
      this.regraUpdated.emit(this.gerarOdataQuery())
    })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const condicao = this.regra.condicao;
      if (condicao) {
        this.loadCondicoesFromOData(condicao);
      }
    }, 100);
  }
  

  get filtros() {
    return this.form.get('filtros') as FormArray;
  }

  novoFiltro() {
    return this.fb.group({
      campo: ['', Validators.required],
      operador: ['', Validators.required],
      valor: [''],
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
      const fieldKey = f.campo?.rowKey ?? '';
      const op = f.operador === 'ge' ? 'get' : f.operador === 'le' ? 'let' : f.operador;
      const val = f.valor === '' ? 'null' : isNaN(f.valor) ? `'${f.valor}'` : f.valor;
      const cond = index < filtros.length - 1 ? ` ${f.condicao} ` : '';
      return `${fieldKey} ${op} ${val}${cond}`;
    }).join('');
  }


  loadCondicoesFromOData(odata: string) {
    if (!odata) return;

    // Exemplo: "SalarioInicial neq null and SalarioInicial get 0"
    const partes = odata.split(/\s+(and|or)\s+/); // mantém os operadores
    const filtros: any[] = [];

    for (let i = 0; i < partes.length; i++) {
      if (i % 2 === 0) {
        const match = partes[i].match(/(\w+)\s+(eq|neq|gt|ge|lt|le|get|let)\s+(.*)/);

        if (match) {
          const campoKey = match[1];
          const operador = match[2] === 'get' ? 'ge' : match[2] === 'let' ? 'le' : match[2];
          const rawValor = match[3];
          const valor = rawValor === 'null' ? '' : rawValor.replace(/^'|'$/g, '');

          const campoObj = this.campos.find(c => c.rowKey === campoKey);

          if (campoObj) {
            filtros.push({
              campo: campoObj, // <-- referência correta
              operador,
              valor,
              condicao: ''
            });
          }

          if (!campoObj) {
            console.warn('Campo não encontrado para rowKey:', campoKey);
            return;
          }
        }
      } else {
        // and / or
        filtros[filtros.length - 1].condicao = partes[i];
      }
    }

    // Preenche no form
    this.filtros.clear();
    filtros.forEach(f => this.filtros.push(this.fb.group(f)));
  }
}

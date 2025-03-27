import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormBuilderService } from '../../../../../../../core/services/form-builder/form-builder.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CamelCaseToWordsPipe } from '../../../../../../../core/pipes/camel-case-to-words';


@Component({
  selector: 'app-config-expression',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, MatButtonModule, MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    CamelCaseToWordsPipe
  ],
  templateUrl: './config-expression.component.html',
  styleUrls: ['./config-expression.component.scss']
})
export class ConfigExpressionComponent implements OnInit {

  activeField: any; // Field ativo recebido do FieldTypeConfigComponent
  // @Output() expressionChange = new EventEmitter<any>();
  private destroy$ = new Subject<void>();

  conditionsForm!: FormArray;
  formGroup!: FormGroup;

  // Injetamos o serviço para obter a lista de propriedades disponíveis
  constructor(private fb: FormBuilder, private fbs: FormBuilderService,  private dialogRef: MatDialogRef<ConfigExpressionComponent>) {

  }

  ngOnInit(): void {

    this.conditionsForm = this.fb.array([]);
    this.formGroup = this.fb.group({
      conditions: this.conditionsForm
    });

    this.fbs.activeFormField$
      .pipe(takeUntil(this.destroy$))
      .subscribe(formField => {
        this.activeField = formField;
        this.parseExistingExpression(this.activeField['field'].expressions['props.disabled']);
      });

    // Atualiza a expressão sempre que o formulário de condições muda
    // this.conditionsForm.valueChanges.subscribe(() => {
    //   this.updateExpression();
    // });
  }

  // Getter para obter a lista de propriedades disponíveis a partir do serviço
  get formFields(): any[] {
    return this.fbs.formFields.map(field => field.field);
  }

  // Adiciona um grupo de condição
  addCondition(): void {
    const group = this.fb.group({
      // 'propriedade' deve ser um objeto com pelo menos a propriedade "key"
      propriedade: [''],
      condicao: [''],
      valor: [''],
      join: ['AND']  // Operador lógico padrão para condições após a primeira
    });
    this.conditionsForm.push(group);
  }

  // Remove uma condição (mantendo ao menos uma)
  removeCondition(index: number): void {
    if (this.conditionsForm.length > 1) {
      this.conditionsForm.removeAt(index);
      this.updateExpression();
    }
  }

  // Atualiza a expressão com base nas condições definidas
  updateExpression(): void {
    let expressionParts: string[] = [];
    (this.conditionsForm.controls as FormGroup[]).forEach((group: FormGroup, index: number) => {
      const prop = group.get('propriedade')?.value;
      const cond = group.get('condicao')?.value;
      const val = group.get('valor')?.value;
      if (!prop || !cond) {
        return;
      }
      const fieldKey = prop.key || prop;
      let expr = '';
      if (cond === 'igual') {
        expr = `model['${fieldKey}'] === ${JSON.stringify(val)}`;
      } else if (cond === 'naoIgual') {
        expr = `model['${fieldKey}'] !== ${JSON.stringify(val)}`;
      } else if (cond === 'vazio') {
        expr = `!model['${fieldKey}']`;
      } else if (cond === 'naoVazio') {
        expr = `!!model['${fieldKey}']`;
      }
      expr = `(${expr})`;
      if (index > 0) {
        const join = group.get('join')?.value;
        const operator = join === 'OU' ? '||' : '&&';
        expr = operator + ' ' + expr;
      }
      expressionParts.push(expr);
    });
    const generatedExpression = expressionParts.join(' ');

    if (this.activeField && this.activeField['field']) {
      // Cria um novo objeto para o field com a expressão atualizada
      const updatedField = {
        ...this.activeField['field'],
        expressions: { 'props.disabled': generatedExpression }
      };
      this.activeField['field'] = updatedField;

      // Atualiza o field no array do serviço para garantir que o preview receba o novo objeto
      const index = this.fbs.formFields.findIndex(item => item.field.id === updatedField.id);
      if (index !== -1) {
        // Cria uma nova cópia do objeto do serviço
        this.fbs.formFields[index] = { ...this.fbs.formFields[index], field: updatedField };
        // Se necessário, forçamos uma nova referência para o array inteiro:
        this.fbs.formFields = [...this.fbs.formFields];
      }
    }
    // this.expressionChange.emit({ expressions: { 'props.disabled': generatedExpression } });
    this.fbs.persistFormFields();
  }


  // Faz parse da expressão existente e preenche o formulário
  parseExistingExpression(expression: string): void {
    // Limpa condições atuais
    while (this.conditionsForm.length !== 0) {
      this.conditionsForm.removeAt(0);
    }
    // Regex para capturar cada condição (operador e condição)
    const regex = /(?:^|(&&|\|\|))\s*\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(expression)) !== null) {
      const operator = match[1]; // "&&" ou "||"
      const conditionStr = match[2];
      let join = 'AND';
      if (operator) {
        join = operator.trim() === '||' ? 'OU' : 'AND';
      }
      let propriedade = '';
      let condicao = '';
      let valor: any = '';
      const equalMatch = /model\['([^']+)'\]\s*===\s*(.+)/.exec(conditionStr);
      const notEqualMatch = /model\['([^']+)'\]\s*!==\s*(.+)/.exec(conditionStr);
      const vazioMatch = /!model\['([^']+)'\]/.exec(conditionStr);
      const naoVazioMatch = /!!model\['([^']+)'\]/.exec(conditionStr);

      if (equalMatch) {
        propriedade = equalMatch[1];
        condicao = 'igual';
        try {
          valor = JSON.parse(equalMatch[2]);
        } catch (e) {
          valor = equalMatch[2];
        }
      } else if (notEqualMatch) {
        propriedade = notEqualMatch[1];
        condicao = 'naoIgual';
        try {
          valor = JSON.parse(notEqualMatch[2]);
        } catch (e) {
          valor = notEqualMatch[2];
        }
      } else if (vazioMatch) {
        propriedade = vazioMatch[1];
        condicao = 'vazio';
      } else if (naoVazioMatch) {
        propriedade = naoVazioMatch[1];
        condicao = 'naoVazio';
      }

      // Procura o objeto real na lista de fields usando a chave
      const matchedField = this.getFieldByKey(propriedade) || { key: propriedade };

      // Cria o grupo de condição preenchido
      const conditionGroup = this.fb.group({
        // Para pré-preencher, criamos um objeto com "key"
        propriedade: [matchedField],
        condicao: [condicao],
        valor: [valor],
        join: [join]
      });
      this.conditionsForm.push(conditionGroup);
    }
    if (this.conditionsForm.length === 0) {
      this.addCondition();
    }
  }

  private getFieldByKey(key: string): any {
    return this.formFields.find(f => f.key === key);
  }

  onSave(): void {
    this.updateExpression();
    this.dialogRef.close(true);  // você pode passar um valor para indicar que salvou
  }
  
  onCancel(): void {
    this.dialogRef.close(false); // indica que a ação foi cancelada
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
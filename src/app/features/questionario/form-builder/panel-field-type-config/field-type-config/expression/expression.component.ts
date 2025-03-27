import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ConfigExpressionComponent } from "./config-expression/config-expression.component";
import { MatDialog } from '@angular/material/dialog';
import { FormBuilderService } from '../../../../../../core/services/form-builder/form-builder.service';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-expression',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule],
  templateUrl: './expression.component.html',
  styleUrl: './expression.component.scss'
})
export class ExpressionComponent implements OnInit {

  activeField: any
  destroy$ = new Subject<void>();
  expression!: string;
  conditions: any[] = [];

  constructor(private dialog: MatDialog, private fbs: FormBuilderService) {

  }
  ngOnInit(): void {
    this.fbs.activeFormField$
      .pipe(takeUntil(this.destroy$))
      .subscribe(formField => {
        this.activeField = formField;
        this.expression = this.activeField['field'].expressions['props.disabled'];
        this.conditions = this.parseExpressionToConditions(this.expression);
        console.log(this.conditions)
      });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(ConfigExpressionComponent, {
      maxWidth: '100%',
      width: 'auto',
      maxHeight: '100%',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  parseExpressionToConditions(expr: string): any[] {
    if (!expr) return [];
    let conditions = [];
    // Regex para capturar cada condição (considera operadores && ou ||)
    const regex = /(?:^|(&&|\|\|))\s*\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(expr)) !== null) {
      const operator = match[1] ? (match[1].trim() === '||' ? 'OU' : 'AND') : '';
      const conditionStr = match[2];
      let condObj: any = { join: operator, propriedade: '', condicao: '', valor: '' };

      const equalMatch = /model\['([^']+)'\]\s*===\s*(.+)/.exec(conditionStr);
      const notEqualMatch = /model\['([^']+)'\]\s*!==\s*(.+)/.exec(conditionStr);
      const vazioMatch = /!model\['([^']+)'\]/.exec(conditionStr);
      const naoVazioMatch = /!!model\['([^']+)'\]/.exec(conditionStr);

      if (equalMatch) {
        condObj.propriedade = equalMatch[1];
        condObj.condicao = 'igual';
        try {
          condObj.valor = JSON.parse(equalMatch[2]);
        } catch (e) {
          condObj.valor = equalMatch[2];
        }
      } else if (notEqualMatch) {
        condObj.propriedade = notEqualMatch[1];
        condObj.condicao = 'diferente';
        try {
          condObj.valor = JSON.parse(notEqualMatch[2]);
        } catch (e) {
          condObj.valor = notEqualMatch[2];
        }
      } else if (vazioMatch) {
        condObj.propriedade = vazioMatch[1];
        condObj.condicao = 'vazio';
      } else if (naoVazioMatch) {
        condObj.propriedade = naoVazioMatch[1];
        condObj.condicao = 'não vazio';
      }
      conditions.push(condObj);
    }
    return conditions;
  }

  /**
   * Converte a chave do campo de CamelCase para um texto com espaços.
   * Ex: "ContratadoExperienciaSimNao" -> "Contratado Experiencia Sim Nao"
   */
  formatFieldKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').trim();
  }

  /**
   * Retorna um label mais amigável para a condição.
   */
  getConditionLabel(condition: any): string {
    switch (condition.condicao) {
      case 'igual':
        return 'Igual a';
      case 'diferente':
        return 'Diferente de';
      case 'vazio':
        return 'É vazio';
      case 'não vazio':
        return 'Não é vazio';
      default:
        return condition.condicao;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

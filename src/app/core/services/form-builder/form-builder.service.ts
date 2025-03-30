import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldType } from '../../models/form-builder/field-type';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { PropriedadesService } from '../propriedades/propriedades.service';
import { PropriedadeData } from '../../models/propriedade';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {

  allPropriedades: PropriedadeData[] = [];
  propriedades: PropriedadeData[] = [];

  fieldTypes: FieldType[] = [
    {
      propriedadeType: 'DateTime',
      title: 'Data',
      icon: 'calendar_month',
      config: {
        type: 'date-field',
        props: {
          label: 'Input',
          placeholder: 'DD/MM/AAAA',
          description: '',
        }
      }
    },
    {
      propriedadeType: 'String',
      title: 'Texto',
      icon: 'title',
      config: {
        type: 'input',
        props: {
          label: 'Input',
          placeholder: 'Placeholder',
          description: '',
        }
      }
    },
    {
      propriedadeType: 'Area',
      title: 'Texto Multiplas Linhas',
      icon: 'notes',
      config: {
        type: 'textarea',
        props: {
          label: 'Textarea',
          placeholder: 'Placeholder',
          description: '',
        },
      }
    },
    {
      propriedadeType: 'Boolean',
      title: 'Sim / Não',
      icon: 'check_box',
      config: {
        type: 'radio',
        props: {
          label: 'Alternativa',
          description: '',
          options: [
            { value: 1, label: 'Sim' },
            { value: 0, label: 'Não' }
          ],
        },
      },
    },
    {
      propriedadeType: 'Money',
      title: 'Monetário',
      icon: 'attach_money',
      config: {
        type: 'monetario-field',
        props: {
          label: 'Input',
          placeholder: 'Placeholder',
          description: '',
        }
      }
    },
  ]

  formFields: any[] = [];

  activeFormField$: BehaviorSubject<any> = new BehaviorSubject(null);

  counter = 0;

  constructor(private propriedadesService: PropriedadesService) {
    // this.loadFormFields();
    this.getPropriedades();
  }

  drop(event: CdkDragDrop<any[]>): void {

    if (event.previousContainer === event.container) {
      // case changing the order
      moveItemInArray(this.formFields, event.previousIndex, event.currentIndex);
    } else {
      // dropping new item
      const field = {
        id: `field_${++this.counter}`,
        name: ``,
        key: ``,
        ...event.item.data.config,
      };

      // this.formlyBuilder.build(field);
      let itemData: any = {
        field: field
      };
      // insert at specific index where the item is dropped
      const insertIndex = event.currentIndex;
      this.formFields.splice(insertIndex, 0, itemData);

      // mark the item as active in order to configure it
      this.formFields.map(i => delete i.active); // deactivate previous items
      itemData.active = true;
      this.activeFormField$.next(itemData);
    }
    this.persistFormFields();
    this.removeTempFields();
    this.updatePropriedade();
  }


  persistFormFields() {
    sessionStorage.setItem("formFields", JSON.stringify(this.formFields));
  }

  //   para salvar no storege
  // loadFormFields() {
  //   if (typeof sessionStorage !== 'undefined') {
  //     let formFields = sessionStorage.getItem('formFields');
  //     if (formFields && formFields.length) {
  //       this.formFields = JSON.parse(formFields);
  //     }
  //   }
  // }

  loadFormFieldsFromJson(jsonString: string) {
    try {
      const parsed = JSON.parse(jsonString);
      this.formFields = parsed;
      this.persistFormFields(); // se quiser manter no sessionStorage
      this.updatePropriedade(); // atualiza propriedades disponíveis
    } catch (e) {
      console.error('Erro ao fazer parse do questionarioAsJson:', e);
    }
  }

  removeItem(item: any) {
    this.formFields = [...this.formFields.filter(i => i !== item)];
    this.persistFormFields();
    this.updatePropriedade();
  }

  removeTempFields() {
    this.fieldTypes = [...this.fieldTypes.filter(i => !i?.['temp'])];
  }

  activateFormField(formField: any) {
    this.formFields.map(i => delete i.active); // deactivate all
    formField.active = true;
    this.activeFormField$.next(formField);
  }

  deactivateFormField() {
    this.formFields.map(i => delete i.active); // deactivate all
    this.activeFormField$.next(null);
  }

  private getPropriedades() {

    this.propriedadesService.getAll().subscribe(response => {

      this.allPropriedades = response.result.map(p => {

        let field = this.fieldTypes.find(f => f.propriedadeType === p.tipo);
        let fieldClone = field ? JSON.parse(JSON.stringify(field)) : null;

        if (fieldClone && fieldClone.config && fieldClone.config.props) {
          fieldClone.config.props.label = p.descricao;
          fieldClone.config.key = p.rowKey;
        }

        return {
          ...p,
          fieldType: fieldClone
        }
      })

      this.propriedades = [...this.allPropriedades];


      this.updatePropriedade();
    });
  }

  private updatePropriedade() {
    const keysInFormFields = this.formFields.map(item => item.field.key);
    this.propriedades = this.allPropriedades.filter(p => !keysInFormFields.includes(p.rowKey));
  }
}
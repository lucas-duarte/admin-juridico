import { Component, ElementRef, importProvidersFrom, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeseData } from '../../../core/models/tese';
<<<<<<< HEAD
import { TeseService } from '../../../core/services/teste/tese.service';
=======
import { TeseService } from '../../../core/services/tese/tese.service';
>>>>>>> initalProject
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { RegrasData } from '../../../core/models/regras';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { RegraComponent } from "./regra/regra.component";
import { FormBuilderService } from '../../../core/services/form-builder/form-builder.service';
import { MatIconModule } from '@angular/material/icon';
import { CamelCaseToWordsPipe } from "../../../core/pipes/camel-case-to-words";
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-form-tese',
  imports: [QuillModule, FormsModule, MatDialogModule, MatButtonModule, MatTabsModule, RegraComponent, MatIconModule, CamelCaseToWordsPipe, MatTooltipModule],
  templateUrl: './form-tese.component.html',
  styleUrl: './form-tese.component.scss'
})
export class FormTeseComponent {
  @ViewChild('dialogBody') dialogBodyRef!: ElementRef;
  @ViewChild('propriedadesDiv') propriedadesDivRef!: ElementRef;
<<<<<<< HEAD
=======
  heightQuill!: string;
>>>>>>> initalProject

  readonly dialogRef = inject(MatDialogRef<FormTeseComponent>);
  readonly formBuilderService = inject(FormBuilderService);
  readonly regra = inject<RegrasData>(MAT_DIALOG_DATA) ?? {} as RegrasData;

  quillInstances: { [key: string]: any } = {};
  editorAtivo: string = 'fato';

  ngAfterViewInit(): void {
<<<<<<< HEAD
    const bodyHeight = this.dialogBodyRef.nativeElement.clientHeight;
    const alturaPropriedades = bodyHeight - 100;
    this.propriedadesDivRef.nativeElement.style.maxHeight = `${alturaPropriedades}px`;
    this.propriedadesDivRef.nativeElement.style.overflowY = 'auto';
  }

  get propriedades() {
    return this.formBuilderService.allPropriedades
=======
    console.log(this.propriedadesDivRef.nativeElement.style.minHeight)
    const bodyHeight = this.dialogBodyRef.nativeElement.clientHeight;
    const alturaPropriedades = bodyHeight - 55;
    this.propriedadesDivRef.nativeElement.style.minHeight = `${alturaPropriedades}px`;
    this.propriedadesDivRef.nativeElement.style.overflowY = 'auto';
    this.heightQuill = `${alturaPropriedades - 130}px`;
  }

  get propriedades() {

    const fieldKeys = this.formBuilderService.formFields.map(item => item.field.key);
    return this.formBuilderService.allPropriedades.filter(p => fieldKeys.includes(p.rowKey));
>>>>>>> initalProject
  }

  onEditorCreated(tipo: 'fato' | 'fundamento' | 'pedido', quill: any) {
    this.quillInstances[tipo] = quill;
  }

  setEditorAtivo(tipo: 'fato' | 'fundamento' | 'pedido') {
    this.editorAtivo = tipo;
  }

  inserirReferencia(referencia: string) {
    const editor = this.quillInstances[this.editorAtivo];
    if (editor) {
      const pos = editor.getSelection(true);
<<<<<<< HEAD
      editor.insertText(pos?.index ?? 0, referencia);
      editor.setSelection((pos?.index ?? 0) + referencia.length);
    }
  }

=======
      const insertIndex = pos?.index ?? 0;
      editor.insertText(insertIndex, referencia);
      const newPos = insertIndex + referencia.length;
      (this.regra as any)[this.editorAtivo] = editor.root.innerHTML;
      setTimeout(() => {
        editor.focus();
        editor.setSelection(newPos, 0, 'user');
      }, 0);
    }
  }

  onEditorClick(tipo: 'fato' | 'fundamento' | 'pedido'): void {
    const editor = this.quillInstances[tipo];
    if (editor) {
      editor.focus();
      // Opcional: posiciona o cursor no final do conteúdo
      const length = editor.getLength();
      editor.setSelection(length, 0, 'user');
    }
  }
  
>>>>>>> initalProject
  onTabChange(event: any) {
    const index = event.index;
    switch (index) {
      case 0:
        this.editorAtivo = 'fato';
        break;
      case 1:
        this.editorAtivo = 'fundamento';
        break;
      case 2:
        this.editorAtivo = 'pedido';
        break;
    }
  }

  getRegraUpdated(regra: string) {
    this.regra.condicao = regra;
  }

  submit(): void {
    this.dialogRef.close(this.regra);
  }

}

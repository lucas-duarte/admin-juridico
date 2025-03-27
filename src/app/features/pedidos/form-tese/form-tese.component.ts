import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeseData } from '../../../core/models/tese';
import { TeseService } from '../../../core/services/teste/tese.service';
import { ActivatedRoute } from '@angular/router';
import { EditorFieldComponent } from "../../../shared/editor-field/editor-field.component";

@Component({
  selector: 'app-form-tese',
  imports: [EditorFieldComponent],
  templateUrl: './form-tese.component.html',
  styleUrl: './form-tese.component.scss'
})
export class FormTeseComponent implements OnInit {

  form!: FormGroup;
  tese: TeseData = {} as TeseData;
  rowKey!: string;
  
  constructor(private formBuilder: FormBuilder, private teseService: TeseService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.rowKey = this.activeRoute.snapshot.paramMap.get('id') ?? '';

    this.getTese();

    this.form = this.formBuilder.group({
      fato: [''],
      fundamento: [''],
      pedido: [''],
      condicao: ['']
    })
  }

  getTese() {
    this.teseService.getById(this.rowKey).subscribe({
      next: (response) => {
        console.log(response)
        if (response.isSuccess) {
          this.tese = response.result

          this.form.patchValue({
            descricao: this.tese.descricao,
            publicado: this.tese.publicado,
          });

        }
      }, error(err) {
        console.log(err)
      },
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeseData } from '../../../core/models/tese';
<<<<<<< HEAD
import { TeseService } from '../../../core/services/teste/tese.service';
=======
import { TeseService } from '../../../core/services/tese/tese.service';
>>>>>>> initalProject
import { FormTeseComponent } from '../form-tese/form-tese.component';
import { MatDialog } from '@angular/material/dialog';
import { RegrasData } from '../../../core/models/regras';
import { QuestionarioComponent } from '../../questionario/questionario.component';
import { FormBuilderService } from '../../../core/services/form-builder/form-builder.service';
import { ToolbarService } from '../../../core/services/toolbar/toolbar.service';
import { PreviewComponent } from '../preview/preview.component';
<<<<<<< HEAD
=======
import { LoadingService } from '../../../core/services/loading/loading.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
>>>>>>> initalProject

@Component({
  selector: 'app-form-pedido',
  imports: [RouterModule, MatTabsModule, MatChipsModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSlideToggleModule, MatExpansionModule],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.scss'
})
export class FormPedidoComponent implements OnInit {

  tese: TeseData = {} as TeseData;
  rowKey!: string;
  form!: FormGroup
  editTitle = false;
  busy = false;

<<<<<<< HEAD
  constructor(private teseService: TeseService, private activeRoute: ActivatedRoute, private formBuilder: FormBuilder, private dialog: MatDialog, private formBuilderService: FormBuilderService, private toolbarService: ToolbarService, private router: Router) { }
=======
  constructor(
    private teseService: TeseService,
    private activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private formBuilderService: FormBuilderService,
    private toolbarService: ToolbarService,
    private router: Router,
    private loadingService: LoadingService,
    private snackbarService: SnackbarService
  ) {
    this.loadingService.show();
  }
>>>>>>> initalProject

  ngOnInit(): void {
    this.onInitForm();
    this.rowKey = this.activeRoute.snapshot.paramMap.get('id') ?? '';
    this.getTese();
  }

  onInitForm() {
    this.form = this.formBuilder.group({
      descricao: [''],
      publicado: ['']
    })
  }

  getTese() {
    this.teseService.getById(this.rowKey).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
          this.form.patchValue({
            descricao: this.tese.descricao,
            publicado: this.tese.publicado,
          });

          this.toolbarService.emitterRoute.emit([
            { title: 'Pedidos', route: 'pedidos' },
            { title: `${this.tese.descricao}`, route: `pedidos/form/${this.rowKey}` },
          ]);
<<<<<<< HEAD
        }
      }, error(err) {
        console.log(err)
=======

          if (this.tese.questionarioAsJson && this.formBuilderService) {
            this.formBuilderService.loadFormFieldsFromJson(this.tese.questionarioAsJson);
          } else {
            this.formBuilderService.loadFormFieldsFromJson(JSON.stringify([]));
          }
        }

        this.loadingService.hide();
      }, error: (err) => {
        console.log(err)
        this.loadingService.hide();
>>>>>>> initalProject
      },
    })
  }

  get descricao() {
    return this.form.get('descricao')!.value
  }

  get publicado() {
    return this.form.get('publicado')!.value
  }

  get regras() {
    return this.tese.regras
  }

  get questionarioAsJson() {
    return this.tese.questionarioAsJson
  }

  set questionarioAsJson(valor: string) {
    this.tese.questionarioAsJson = valor;
  }


  openDialogRegra(regra?: RegrasData): void {
    const dialogRef = this.dialog.open(FormTeseComponent, {
      data: regra,
      minWidth: '100%',
<<<<<<< HEAD
      height: 'auto',
      minHeight: 'auto',
      maxHeight: 'auto',
=======
      height: '100vh',
      minHeight: 'auto',
      maxHeight: '100vh',
>>>>>>> initalProject
      panelClass: 'p-5'
    });

    dialogRef.afterClosed().subscribe(result => {
<<<<<<< HEAD
      console.log('The dialog was closed');
      if (result) {
        const index = this.tese.regras.findIndex(r => r.descricao === result.descricao);
=======
      if (result) {
        console.log(result);
        const index = this.tese.regras.findIndex(r => r.id === result.id);
>>>>>>> initalProject

        if (index !== -1) {
          this.tese.regras[index] = result;
        } else {
          this.tese.regras.push(result);
        }
        this.submit();
      }
    });
  }

  navigateToQuestionario(): void {
    this.router.navigate(['questionario', this.rowKey])
  }
<<<<<<< HEAD
  
  navigateToPreview(): void {
=======

  navigateToPreview(): void {
    this.loadingService.show();
>>>>>>> initalProject
    this.router.navigate(['preview', this.rowKey])
  }

  submit() {

    const data = {
      descricao: this.descricao,
      questionarioAsJson: this.questionarioAsJson,
      regras: this.regras,
      publicado: this.publicado
    }

    console.log(data)
<<<<<<< HEAD
=======

>>>>>>> initalProject
    this.busy = true;
    this.teseService.update(this.rowKey, data).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.tese = response.result
<<<<<<< HEAD
=======
          this.snackbarService.notificationSuccess("Pedido atualizado com sucesso!")
>>>>>>> initalProject
        }
        this.busy = false;
      }, error: (err) => {
        console.log(err)
<<<<<<< HEAD
=======
        this.snackbarService.notificationError(err)
>>>>>>> initalProject
        this.busy = false;
      },
    })
  }
}

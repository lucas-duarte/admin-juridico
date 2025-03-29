import { Component, importProvidersFrom, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeseData } from '../../../core/models/tese';
import { TeseService } from '../../../core/services/teste/tese.service';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { RegrasData } from '../../../core/models/regras';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-form-tese',
  imports: [QuillModule, FormsModule, MatDialogModule, MatButtonModule, MatTabsModule ],
  templateUrl: './form-tese.component.html',
  styleUrl: './form-tese.component.scss'
})
export class FormTeseComponent implements OnInit {
  
  readonly dialogRef = inject(MatDialogRef<FormTeseComponent>);
  readonly regra = inject<RegrasData>(MAT_DIALOG_DATA) ?? {} as RegrasData;

  ngOnInit(): void {
   
  }

  submit(): void {
    this.dialogRef.close(this.regra);
  }
}

import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-preview',
  imports: [MatDialogModule],
  templateUrl: './dialog-preview.component.html',
  styleUrl: './dialog-preview.component.scss'
})
export class DialogPreviewComponent {
  readonly dialogRef = inject(MatDialogRef<DialogPreviewComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close();
  }
}

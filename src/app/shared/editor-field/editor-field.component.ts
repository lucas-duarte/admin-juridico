import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CKEditorModule, loadCKEditorCloud, CKEditorCloudResult } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-editor-field',
  imports: [CommonModule, CKEditorModule],
  templateUrl: './editor-field.component.html',
  styleUrl: './editor-field.component.scss'
})
export class EditorFieldComponent {
  public Editor: typeof ClassicEditor | null = null;

  public config: EditorConfig | null = null;

  public ngOnInit(): void {
      loadCKEditorCloud( {
          version: '44.3.0',
          premium: true
      } ).then( this._setupEditor.bind( this ) );
  }

  private _setupEditor ( cloud: CKEditorCloudResult<{ version: '44.3.0', premium: true }> ) {
      const {
          ClassicEditor,
          Essentials,
          Paragraph,
          Bold,
          Italic
      } = cloud.CKEditor;

      const { FormatPainter } = cloud.CKEditorPremiumFeatures;

      this.Editor = ClassicEditor;
      this.config = {
          licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NDQzMjk1OTksImp0aSI6ImVlMGRlM2Q0LTlhZjMtNDNiNy05NTRiLWFiNWZmZWM4ZTVhNSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImRhZDIyZWIyIn0.g7veKrxxK4s-QKoMumyF1-eepQE7DHjnk_IKgeBk9OmRI3oeLVfB_yGV0CwAxsp8UnaGI4GUI6aO04Ulbuiy1Q',
          plugins: [ Essentials, Paragraph, Bold, Italic, FormatPainter ],
          toolbar: [ 'undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter' ]
      };
  }
}

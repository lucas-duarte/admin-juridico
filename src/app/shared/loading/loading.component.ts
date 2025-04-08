import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading/loading.service';

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  readonly loadingService = inject(LoadingService);
}

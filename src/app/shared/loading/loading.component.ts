<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading/loading.service';
>>>>>>> initalProject

@Component({
  selector: 'app-loading',
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
<<<<<<< HEAD

=======
  readonly loadingService = inject(LoadingService);
>>>>>>> initalProject
}

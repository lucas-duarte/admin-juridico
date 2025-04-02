import { Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-table-loading-skeleton',
  imports: [MatProgressBarModule],
  templateUrl: './table-loading-skeleton.component.html',
  styleUrl: './table-loading-skeleton.component.scss'
})
export class TableLoadingSkeletonComponent {
  @Input() busy = true;
}

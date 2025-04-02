import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-skeleton',
  imports: [],
  templateUrl: './loading-skeleton.component.html',
  styleUrl: './loading-skeleton.component.scss'
})
export class LoadingSkeletonComponent {

  @Input() width!: string;
  @Input() height!: string;
  @Input() borderRadius!: string;
  @Input() class!: string;
  @Input() busy = true;
  
}

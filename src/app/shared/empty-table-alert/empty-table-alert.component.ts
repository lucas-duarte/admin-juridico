import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-table-alert',
  imports: [MatIconModule],
  templateUrl: './empty-table-alert.component.html',
  styleUrl: './empty-table-alert.component.scss'
})
export class EmptyTableAlertComponent {
  @Input() title!: string
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { RouterOutlet, RouterModule } from '@angular/router';
import { ToolbarComponent } from '../../shared/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatFormFieldModule, MatSidenavModule, MatSelectModule, MatButtonModule, ToolbarComponent, RouterOutlet, MatIconModule, MatListModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isImageModalVisible = false;
  constructor() { }

  ngOnInit(): void {
  
  }

}

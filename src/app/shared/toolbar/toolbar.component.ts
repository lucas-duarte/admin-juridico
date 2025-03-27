import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'
import { User } from '../../core/models/user';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  busy!: boolean;
  userData: User = {} as User;
  @Output() menuAction = new EventEmitter();
  
  constructor( ) { }

  ngOnInit(): void {

    // this.busy = true;

    // const userId = this.authService.getUserIdFromToken() ?? '';
    // this.authService.getUserById(userId).subscribe({
    //   next: (response) => {
    //     this.userData = response;
    //     this.busy = false;
    //   },
    //   error: (error) => {
    //     console.log(error);
    //     this.busy = false;
    //   }
    // });
  }
  
  emitterMenu() {
    this.menuAction.emit();
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}

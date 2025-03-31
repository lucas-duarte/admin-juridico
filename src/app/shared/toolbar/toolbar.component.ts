import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Router } from 'express';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar'
import { User } from '../../core/models/user';
import { ToolbarService } from '../../core/services/toolbar/toolbar.service';
import { ToolbarRoute } from '../../core/models/toolbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  busy!: boolean;
  userData: User = {} as User;
  @Output() menuAction = new EventEmitter();
  @Input() displayHeader = false;  
  routes!: ToolbarRoute[];
  
  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {

    this.toolbarService.emitterLogin.subscribe(login => {
      this.displayHeader = login
    })

    this.toolbarService.emitterRoute.subscribe(routes => {
      this.routes = routes
    });

  }

  getBreadcrumbLink(index: number): string {
    return this.routes
      .slice(0, index + 1)
      .map(route => route.route)
      .join('/');
  }

  emitterMenu() {
    this.menuAction.emit();
  }

  logout() {
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}

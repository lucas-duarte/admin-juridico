import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }


  notificationSuccess(message: string) {
    this.snackBar.open(message, undefined, {
      panelClass: 'app-notification-success',
      duration: 3000
    });
  }

  simpleMessageError(message: string, type: string = 'app-notification-error') {
    this.snackBar.open(message, undefined, {
      panelClass: type,
      duration: 3000
    });
  }

  simpleMessageAlert(message: string, type: string = 'app-notification-alert') {
    this.snackBar.open(message, undefined, {
      panelClass: type,
      duration: 3000
    });
  }
}

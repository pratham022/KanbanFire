import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string, status: string) {
    let customClassName = '';
    if(status === 'failure')
      customClassName = 'snackbar-danger';
    else  
      customClassName = 'snackbar-success'
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: [customClassName]
    });
  }
}

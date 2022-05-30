import { Injectable, isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _snackBar: MatSnackBar) { }

  showError(message: string) {
    this._snackBar.open(message, undefined, {
      duration: 5000,
      panelClass: "configError"
    });
  }
}

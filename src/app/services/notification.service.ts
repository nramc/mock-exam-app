import {Injectable} from '@angular/core';
import {AlertModelComponent} from "../alert-model/alert-model.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matDialog: MatDialog,
              private router: Router) {
  }

  public notifyError(): void {
    const dialogRef = this.matDialog.open(AlertModelComponent, {
      data: {
        title: 'Error',
        message: 'Sorry. Internal error occurred. Please try again later.'
      }
    });
    dialogRef.afterClosed().subscribe(_result => this.router.navigate(['/']));
  }
}

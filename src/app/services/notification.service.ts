import {Injectable} from '@angular/core';
import {AlertDialogData, AlertModelComponent, AlertType} from "../alert-model/alert-model.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private matDialog: MatDialog,
              private router: Router) {
  }

  public errorWithHomeNavigation(data: AlertDialogData): MatDialogRef<AlertModelComponent> {
    const dialogRef = this.matDialog.open(AlertModelComponent, {
      data: {
        type: AlertType.ERROR,
        title: data.title || 'Error',
        message: data.message || 'Sorry. Internal error occurred. Please try again later.'
      }
    });
    dialogRef.afterClosed().subscribe(_result => this.router.navigate(['/']));
    return dialogRef;
  }

  public error(data: AlertDialogData): MatDialogRef<AlertModelComponent> {
    return this.matDialog.open(AlertModelComponent, {
      data: {
        type: AlertType.ERROR,
        title: data.title || 'Error',
        message: data.message || 'Sorry. Internal error occurred. Please try again later.'
      }
    });
  }

  public info(data: AlertDialogData): MatDialogRef<AlertModelComponent> {
    return this.matDialog.open(AlertModelComponent, {
      data: {
        type: AlertType.INFO,
        title: data.title || 'Information',
        message: data.message || 'Internal error occurred. Please try again later.'
      }
    });
  }

  public confirm(data: AlertDialogData): MatDialogRef<AlertModelComponent> {
    return this.matDialog.open(AlertModelComponent, {
      data: {
        type: AlertType.CONFIRM,
        title: data.title || 'Confirmation',
        message: data.message || 'Please confirm',
        btnConfirmLabel: data.btnConfirmLabel || 'Confirm',
        btnCloseLabel: data.btnCloseLabel || 'Cancel',
      }
    });
  }

  public warn(data: AlertDialogData): MatDialogRef<AlertModelComponent> {
    return this.matDialog.open(AlertModelComponent, {
      data: {
        type: AlertType.WARN,
        title: data.title || 'Warning',
        message: data.message || 'Please confirm',
        btnConfirmLabel: data.btnConfirmLabel || 'Proceed',
        btnCloseLabel: data.btnCloseLabel || 'Cancel',
      }
    });
  }

}

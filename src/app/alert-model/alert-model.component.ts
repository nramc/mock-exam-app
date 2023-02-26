import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export enum AlertType {
  INFO,
  WARN,
  CONFIRM,
  ERROR

}

export interface AlertDialogData {
  type?: AlertType
  title? : string
  message : string
  btnCloseLabel?: string
  btnConfirmLabel?: string
}
@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent {
  alertType = AlertType;

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertDialogData) {}

}

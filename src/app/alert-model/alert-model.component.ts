import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  title : string;
  message : string;
  btnCloseLabel?: string;
  btnConfirmLabel?: string;
}
@Component({
  selector: 'app-alert-model',
  templateUrl: './alert-model.component.html',
  styleUrls: ['./alert-model.component.scss']
})
export class AlertModelComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}

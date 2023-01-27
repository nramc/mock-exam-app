import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AlertModelComponent } from '../alert-model/alert-model.component';
import { Exam } from '../entity/Exam.enity';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams!: Exam[];

  constructor(
    private dataService : DataServiceService,
    private router : Router,
    private matDialog : MatDialog) {

  }



  ngOnInit(): void {
    this.exams = this.dataService.getAllExams();
    if( this.exams?.length == 0 ) {
      const dialogRef = this.matDialog.open(AlertModelComponent, {
        data: {
          title : 'Error',
          message : 'No mock exams available at the moment. Please try again later.'
        }
      });
    }
  }

  public gotoExam(exam : Exam) : void {
    this.router.navigate(['/exam', exam.id]);
  }

}

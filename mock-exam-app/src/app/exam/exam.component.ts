import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertModelComponent } from '../alert-model/alert-model.component';
import { Exam } from '../entity/Exam.enity';
import { DataServiceService } from '../services/data-service.service';
import { PersistentService } from '../services/persistent.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  exam!: Exam;

  constructor(private dataService : DataServiceService,
    private persistentService : PersistentService,
    private matDialog : MatDialog,
    private router : Router, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let examId = params.get("examId") as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
    });
    if( !this.exam?.id ) {
      const dialogRef = this.matDialog.open(AlertModelComponent, {
        data: {
          title : 'Error',
          message : 'Exam is invalid. Please try again.'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/']);
      });
    }
  }

  public startExam() : void {
    this.persistentService.cleanup();
    this.persistentService.initializeExam(this.exam);
    this.router.navigate(['question', 1], {relativeTo: this.activatedRoute});
  }

}

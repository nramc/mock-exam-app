import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AlertModelComponent} from '../alert-model/alert-model.component';
import {DataServiceService} from '../services/data-service.service';
import {Exam} from "../domain/exam.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams: Exam[] | undefined;

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private matDialog: MatDialog) {

  }


  ngOnInit(): void {
    this.exams = this.dataService.getAllExams();
    if (!this.exams || this.exams.length == 0) {
      this.matDialog.open(AlertModelComponent, {
        data: {
          title: 'Info',
          message: 'Practice exams are not available at the moment. Please try again later.'
        }
      });
    }
  }

  public gotoExam(exam: Exam): void {
    this.router.navigate(['/exam', exam.id]);
  }

}

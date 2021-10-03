import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Exam } from '../entity/Exam.enity';
import { Question } from '../entity/Question.entity';
import { DataServiceService } from '../services/data-service.service';
import { PersistentService } from '../services/persistent.service';
import { templateJitUrl } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { AlertModelComponent } from '../alert-model/alert-model.component';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  exam!: Exam;
  allQuestions!: Question[];
  question!: Question;

  constructor(
    private dataService : DataServiceService,
    private persistentService: PersistentService,
    private router: Router, private actvatedRoute: ActivatedRoute,
    private matSnackBar : MatSnackBar,
    private matDialog : MatDialog) { }

  ngOnInit(): void {
    this.actvatedRoute.paramMap.subscribe(params => {
      const examId = params.get('examId') as string;
      this.exam = this.persistentService.getExam(examId) as Exam;
      const questionId = params.get('questionId');
      if ( this.exam?.id && questionId && +questionId <= this.exam.noOfQuestions) {
        this.setQuestion(examId, +questionId);
      } else {
        const dialogRef = this.matDialog.open(AlertModelComponent, {
          data: {
            title : 'Error',
            message : 'Exam is invalid or expired. Please try again later.'
          }
        });
        dialogRef.afterClosed().subscribe(_result => this.router.navigate(['/']));
      }

    });
  }

  save() : void {
    this.question.isQuestionAnswerd = true;
    this.persistentService.saveQuestion(this.question);
    this.matSnackBar.open("Answer saved successfully", "Close", {
      duration : 1000,
      politeness: 'polite',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'mat-snack-bar-primary'
    });
  }

  submit() : void {

    const dialogRef = this.matDialog.open(AlertModelComponent, {
      data: {
        title : 'Submit Exam',
        message : 'Do you want to submit exam.?',
        btnConfirmLabel : 'Yes',
        btnCloseLabel : 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if ( result == 'YES' ) {
        this.exam.isSubmitted = true;
        this.save();

        this.persistentService.saveExam(this.exam);
        this.router.navigate([`exam/${this.exam.id}/summary`]);

      }
    });


  }

  moveToNextQuestion() : void {
    if( this.exam.noOfQuestions <= this.question.id+1) {
      this.router.navigate([`exam/${this.exam.id}/question/`, this.question.id+1]);
    }

  }

  moveToPrevQuestion() : void {
    if (this.question.id >= 1) {
      this.router.navigate([`exam/${this.exam.id}/question/`, this.question.id-1]);
    }
  }

  home() : void {
    this.router.navigate(['/']);
  }

  canDisplaySolution() : boolean {
    return this.exam.isSubmitted || (this.exam.showResultForEachQuestion && this.question?.isQuestionAnswerd ) as boolean;
  }

  isItLastQuestion() : boolean {
    return this.question?.id === this.exam.noOfQuestions;
  }

  isItFirstQuestion() : boolean {
    return this.question?.id === 1;
  }

  canDisplaySubmitOption() : boolean {
    return this.question?.id === this.exam.noOfQuestions && !this.exam.isSubmitted;
  }

  getCurrentProgress() : number {
    return this.persistentService.getAllQuestions(this.exam.id).filter(question => question.isQuestionAnswerd).length/this.exam.noOfQuestions * 100;
  }

  private setQuestion(examId : string, questionId: number) : void {
    this.persistentService.getQuestion(examId, questionId).then(question => this.question = question);
  }

}

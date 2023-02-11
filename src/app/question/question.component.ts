import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {DataServiceService} from '../services/data-service.service';
import {PersistentService} from '../services/persistent.service';
import {AlertModelComponent} from '../alert-model/alert-model.component';
import {PracticeExam} from "../domain/practice-exam.model";
import {PracticeQuestion} from "../domain/practice-question.model";
import {DisplaySolutionOption} from "../domain/display-solution-option";
import {NotificationService} from "../services/notification.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html'
})
export class QuestionComponent {

  exam!: PracticeExam;
  question!: PracticeQuestion;

  constructor(
    private dataService: DataServiceService,
    private notifyService: NotificationService,
    private persistentService: PersistentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    private matDialog: MatDialog) {

    this.activatedRoute.paramMap.subscribe(async params => {
      const examId = params.get('examId') as string;
      this.exam = await this.persistentService.getPracticeExam(examId);
      const questionRowNo = params.get('questionId');
      if (this.exam?.id && questionRowNo && +questionRowNo <= this.exam.noOfQuestions) {
        this.setQuestion(+questionRowNo);
      } else {
        this.notifyService.notifyError();
      }

    });
  }


  save(): void {
    this.question.isQuestionAnswered = true;
    this.persistentService.saveQuestion(this.question);
    this.matSnackBar.open("Answer saved successfully", "Close", {
      duration: 1000,
      politeness: 'polite',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: 'mat-snack-bar-primary'
    });
  }

  submit(): void {

    const dialogRef = this.matDialog.open(AlertModelComponent, {
      data: {
        title: 'Submit Exam',
        message: 'Do you want to submit exam.?',
        btnConfirmLabel: 'Yes',
        btnCloseLabel: 'No'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'YES') {
        this.exam.isSubmitted = true;
        this.save();

        this.persistentService.saveExam(this.exam!);
        this.router.navigate([`exam/${this.exam?.id}/summary`]);

      }
    });


  }

  moveToNextQuestion(): void {
    if (this.question.rowNo + 1 <= this.exam.noOfQuestions) {
      this.router.navigate([`exam/${this.exam?.id}/question/`, this.question.rowNo + 1]);
    }

  }

  moveToPrevQuestion(): void {
    if (this.question.rowNo > 1) {
      this.router.navigate([`exam/${this.exam?.id}/question/`, this.question.rowNo - 1]);
    }
  }

  home(): void {
    this.router.navigate(['/']);
  }

  canDisplaySolution(): boolean {
    return this.exam?.isSubmitted ||
      (this.exam?.solutionDisplayOption == DisplaySolutionOption.AFTER_QUESTION_SUBMISSION && this.question?.isQuestionAnswered) as boolean;
  }

  isItLastQuestion(): boolean {
    return this.question?.rowNo === this.exam?.noOfQuestions;
  }

  isItFirstQuestion(): boolean {
    return this.question?.rowNo === 1;
  }

  canDisplaySubmitOption(): boolean {
    return this.question?.rowNo === this.exam?.noOfQuestions && !this.exam?.isSubmitted;
  }

  getCurrentProgress(): number {
    return this.exam?.questions.filter(question => question.isQuestionAnswered).length / this.exam?.noOfQuestions * 100;
  }

  private setQuestion(questionRowNumber: number): void {
    this.question = this.exam?.questions.find(q => q.rowNo == questionRowNumber)!;
  }

  isAnswerCorrect(): boolean {
    return this.question.options.every(option => option.isCorrectAnswer == option.isSelected);
  }

  canDisableInput(): boolean {
    return this.exam.isSubmitted ||
      (this.exam.solutionDisplayOption == DisplaySolutionOption.AFTER_QUESTION_SUBMISSION && this.question.isQuestionAnswered) as boolean;
  }

}

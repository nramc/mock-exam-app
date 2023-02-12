import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DataServiceService} from '../../../services/data-service.service';
import {PersistentService} from '../../../services/persistent.service';
import {AlertModelComponent} from '../../../alert-model/alert-model.component';
import {PracticeExam} from "../../../domain/practice-exam.model";
import {PracticeQuestion} from "../../../domain/practice-question.model";
import {DisplaySolutionOption} from "../../../domain/display-solution-option";
import {NotificationService} from "../../../services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {Option} from "../../../domain/option.model";

@Component({
  selector: 'app-practice-exam-question',
  templateUrl: './practice-exam-question.component.html',
  styleUrls: ['./practice-exam-question.component.scss']
})
export class PracticeExamQuestionComponent {

  exam!: PracticeExam;
  question!: PracticeQuestion;
  displaySolutionOption = DisplaySolutionOption;

  constructor(
    private dataService: DataServiceService,
    private notifyService: NotificationService,
    private persistentService: PersistentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
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

        this.persistentService.saveExam(this.exam);
        this.router.navigate([`exam/${this.exam?.id}/summary`]);

      }
    });


  }

  moveToNextQuestion(): void {
    this.save();
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

  isQuestionOrExamSubmitted(): boolean {
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
    return this.question.options.every(option => Boolean(option.isCorrectAnswer) === Boolean(option.isSelected));
  }

  canDisableInput(): boolean {
    return this.exam.isSubmitted ||
      (this.exam.solutionDisplayOption == DisplaySolutionOption.AFTER_QUESTION_SUBMISSION && this.question.isQuestionAnswered) as boolean;
  }

  fnTracedByForOption(index: number, item: Option) {
    return item?.id;
  }

  singleOptionChangeEvent($event: any) {
    const selectedOption = $event.value;
    this.question.options.forEach(option => option.isSelected = option.id === selectedOption)
  }

}

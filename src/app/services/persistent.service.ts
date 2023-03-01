import {Injectable} from '@angular/core';
import {DataServiceService} from './data-service.service';
import {Exam} from "../domain/exam.model";
import {PracticeExam} from "../domain/practice-exam.model";
import {Question} from "../domain/question.model";
import {PracticeQuestion} from "../domain/practice-question.model";
import {DisplaySolutionOption} from "../domain/display-solution-option";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class PersistentService {
  private exam: PracticeExam | undefined;

  constructor(private dataService: DataServiceService,
              private notificationService: NotificationService) {
  }

  async initializeExam(exam: Exam): Promise<PracticeExam | undefined> {
    this.cleanup();

    await this.dataService.fetchExamById(exam.id).then(data => {
      if (!data) {
        this.notificationService.errorWithHomeNavigation({
          message: 'Exam is invalid or expired. Please try again later.'
        });
      } else {

        this.exam = Object.assign({}, data,
          {solutionDisplayOption: exam.solutionDisplayOption || DisplaySolutionOption.AFTER_EXAM_SUBMISSION}) as PracticeExam;
        this.exam.questions.forEach((question, index) => question.rowNo = index + 1);
      }
    });
    return this.exam;
  }

  public cleanup() {
    this.exam = undefined;
  }

  private isExamInitialised() {
    return this.exam && this.exam.questions.length > 0;
  }

  public async getPracticeExam(examId: string): Promise<PracticeExam> {
    if (!this.isExamInitialised()) {
      await this.initializeExam(this.dataService.getExamById(examId)!);
    }
    return Object.assign({}, this.exam);
  }

  private findQuestion(questionId: string, examId: string): Question {
    return this.exam?.questions.find(question => question.id === questionId && this.exam?.id === examId) as Question;
  }

  public getQuestion(examId: string, questionId: string): Question {
    return Object.assign({}, this.findQuestion(questionId, examId));
  }

  public getAllQuestions(examId: string): PracticeQuestion[] {
    return this.exam?.id == examId ? this.exam?.questions : [];
  }

  public saveExam(exam: PracticeExam): void {
    this.exam = exam;
  }

  public saveQuestion(question: PracticeQuestion): void {
    const indexPos = this.exam?.questions.findIndex(q => q.id == question.id)!;
    if (indexPos > -1) {
      this.exam?.questions.splice(indexPos, 1, Object.assign({}, question));
    } else {
      console.error('Error: Question not found. Index:', indexPos)
    }
  }


}

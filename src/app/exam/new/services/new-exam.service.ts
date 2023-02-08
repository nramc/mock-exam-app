import {Injectable} from '@angular/core';
import {Exam} from "../../../domain/exam.model";
import {Question} from "../../../domain/question.model";

@Injectable({
  providedIn: 'root'
})
export class NewExamService {
  private exam!: Exam;

  public getExam(): Exam {
    return this.exam;
  }

  public saveExam(exam: Exam): Exam {
    this.exam = exam;
    return this.exam;
  }

  public addQuestion(newQuestion:Question) : Exam {
    this.exam.questions.push(newQuestion);
    return this.exam;
  }

  public hasValidExamDetails(): boolean {
    return this.exam?.id != null;
  }

}

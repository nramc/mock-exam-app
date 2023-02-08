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

  public saveOrUpdateQuestion(question: Question): Exam {
    let index = this.exam.questions.findIndex(q => q.id == question.id);
    if (index >= 0) {
      this.exam.questions[index] = question;
    } else {
      this.exam.questions.push(question);
    }
    return this.exam;
  }

  public hasValidExamDetails(): boolean {
    return this.exam?.id != null;
  }

}

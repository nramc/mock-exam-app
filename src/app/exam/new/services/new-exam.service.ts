import {Injectable} from '@angular/core';
import {Exam} from "../../../domain/exam.model";

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

  public hasValidExamDetails(): boolean {
    return this.exam?.id != null;
  }

}

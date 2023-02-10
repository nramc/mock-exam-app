import {Injectable} from '@angular/core';
import {Exam} from "../../../domain/exam.model";
import {Question} from "../../../domain/question.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewExamService {
  private exam!: Exam;
  private exam$ = new BehaviorSubject<Exam>(Object.assign({}))

  public getExam(): Exam {
    this.exam$.next(this.exam);
    return this.exam;
  }

  public getExam$(): Observable<Exam> {
    return this.exam$.asObservable();
  }

  public saveExam(exam: Exam): void {
    this.exam = exam;
    this.exam$.next(this.exam);
  }

  public saveOrUpdateQuestion(question: Question): void {
    if (!question.id) return;
    let index = this.exam.questions.findIndex(q => q.id == question.id);
    if (index >= 0) {
      this.exam.questions[index] = question;
    } else {
      this.exam.questions.push(question);
    }
    this.exam$.next(this.exam);
  }

  public deleteQuestion(question: Question): void {
    let index = this.exam.questions.findIndex(q => q.id == question.id);
    this.exam.questions.splice(index, 1);
    this.exam$.next(this.exam);
  }

  public hasValidExamDetails(): boolean {
    return this.exam?.id != null;
  }

}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import allExams from '../../assets/data/all-exams.json';
import {Exam} from "../domain/exam.model";

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private readonly exams !: Exam[];

  constructor(private http: HttpClient) {
    this.exams = allExams;
  }

  public getAllExams(): Exam[] {
    return [...this.exams];
  }

  public getExamById(examId: string): Exam | undefined {
    return Object.assign({}, this.exams.find(exam => exam.id == examId));
  }

  public fetchExamById(examId: string): Promise<Exam> {
    const dataFileName = 'assets/data/' + examId + '.json';
    return this.http.get<Exam>(dataFileName).toPromise();
  }

}

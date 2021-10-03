import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ServiceNameService {
  constructor(private httpClient: HttpClient) { }

}

import examData from '../../assets/data/exam.json';
import { Exam } from '../entity/Exam.enity';
import { Question } from '../entity/Question.entity';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private exams !: Exam[];
  constructor(private http : HttpClient) {
    this.exams = examData;
  }

  public getAllExams() : Exam[] {
    return [...this.exams];
  }

  public getExamById(examId : string) : Exam | undefined {
    return Object.assign({}, this.exams.find(exam => exam.id == examId));
  }

  public getAllQuestions(examId : string) : Observable<Question[]> {
    const dataFileName = 'assets/data/' + examId + '.json';
    return this.http.get<Question[]>(dataFileName);
  }

}

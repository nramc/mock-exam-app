import { Injectable, OnInit } from '@angular/core';

import examData from '../data/exam.json';
import { Exam } from '../entity/Exam.enity';


@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private exams !: Exam[];
  constructor() {
    this.exams = examData;
  }

  public getAllExams() : Exam[] {
    return this.exams;
  }

  public getExamById(examId : string) : Exam | undefined {
    return this.exams.find(exam => exam.id == examId);
  }
}

import { Injectable } from '@angular/core';
import { Exam } from '../entity/Exam.enity';
import { Question } from '../entity/Question.entity';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PersistentService {

  private RETRY_COUNT = 3;
  private MAX_INITIALIZE_COUNT = 3;
  private allQuestions : Question[] = [];
  private exam!: Exam;
  private sleep = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));

  constructor(private dataService : DataServiceService) { }

  async initializeExam(exam : Exam) : Promise<void> {
    this.exam = exam;
    await this.dataService.getAllQuestions(exam.id).subscribe(data => {
      //TODO: Check whether data is not empty
        console.log(data);
        this.allQuestions = data;
      });
  }

  public cleanup() {
    this.allQuestions = [];
  }

  public async getQuestion(examId : string, questionId : number) : Promise<Question> {
    let retriedCount = 0;
    let initializeCount = 0;
    WaitForResult:
    while (this.allQuestions.length == 0 && retriedCount++ < this.RETRY_COUNT) {
      console.log('Retried : ', retriedCount++);
      await this.sleep(300);
      if ( this.allQuestions.length == 0 && retriedCount > this.RETRY_COUNT && initializeCount <= this.MAX_INITIALIZE_COUNT ) {
        await this.initializeExam(this.getExam(examId));
        retriedCount = 0;
        initializeCount++;
        continue WaitForResult;
      }
    }
    console.log(this.allQuestions);
    return Object.assign({}, this.findQuestion(questionId, examId)) as Question;
  }

  public saveQuestion(question : Question) : void {
    let indexPos = this.allQuestions.findIndex(storedQuestion => storedQuestion.id == question.id && storedQuestion.examId == question.examId);
    this.allQuestions[indexPos] = Object.assign({}, question);
  }

  public getAllQuestions(examId : string) {
    return this.allQuestions.filter(question => question.examId == examId);
  }

  public getExam(examId : string) {
    if ( !this.exam?.id ) {
      this.exam = this.dataService.getExamById(examId) as Exam;
    }
    return Object.assign({}, this.exam );
  }

  public saveExam(exam : Exam) : void {
    this.exam = exam;
  }

  private findQuestion(questionId : number, examId : string) : Question {
    return this.allQuestions.find(question => question.id === questionId && question.examId === examId) as Question;
  }


}

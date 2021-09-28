import { Injectable } from '@angular/core';
import { Question } from '../entity/Question.entity';
import { DataServiceService } from './data-service.service';

@Injectable({
  providedIn: 'root'
})
export class PersistentService {

  private RETRY_COUNT = 3;
  private MAX_INITIALIZE_COUNT = 3;
  private allQuestions : Question[] = [];
  private sleep = (ms : number) => new Promise(resolve => setTimeout(resolve, ms));

  constructor(private dataService : DataServiceService) { }

  async initializeExam(examId : string) : Promise<void> {
    await this.dataService.getAllQuestions(examId).subscribe(data => {
      //TODO: Check whether data is not empty
        console.log(data);
        this.allQuestions = data;
      });
  }

  public async getQuestion(examId : string, questionId : number) : Promise<Question> {
    let retriedCount = 0;
    let initializeCount = 0;
    WaitForResult:
    while (this.allQuestions.length == 0 && retriedCount++ < this.RETRY_COUNT) {
      console.log('Retried : ', retriedCount++);
      await this.sleep(300);
      if ( this.allQuestions.length == 0 && retriedCount > this.RETRY_COUNT && initializeCount <= this.MAX_INITIALIZE_COUNT ) {
        await this.initializeExam(examId);
        retriedCount = 0;
        initializeCount++;
        continue WaitForResult;
      }
    }



    return this.allQuestions.find(question => question.id === +questionId && question.examId === examId) as Question;
  }


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../entity/Exam.enity';
import { Question } from '../entity/Question.entity';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  exam!: Exam;
  question!: Question;

  code : string = `
  public static void main () {
    int i = 0;
    i += i++;
    System.out.println("Hello World..!" + i);
   }`
  ;
  constructor(
    private dataService : DataServiceService,
    private router: Router, private actvatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actvatedRoute.paramMap.subscribe(params => {
      const examId = params.get('examId') as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
      // Question goes here
      const questionId = params.get('questionId');
      if ( questionId ) {
        console.log('Question id : ' + questionId);
        this.dataService.getAllQuestions(examId).subscribe(data => {
            console.log(data);
            this.question = data.find(question => question.id === +questionId) as Question;
          });;
      } else {
        console.error('Invalid Question ID..!');
      }

    });
  }

}

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
  allQuestions!: Question[];
  question!: Question;

  constructor(
    private dataService : DataServiceService,
    private router: Router, private actvatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actvatedRoute.paramMap.subscribe(params => {
      const examId = params.get('examId') as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
      //TODO check Exam ID is valid
      const questionId = params.get('questionId');
      if ( examId && questionId ) {
        console.log('Question id : ' + questionId);
        this.fetchQuestionsAndDisplayQuestion(examId, +questionId);
      } else {
        console.error('Invalid Question ID..!');
      }

    });
  }

  canDisplaySolution() : boolean {
    return this.exam.isSubmitted || (this.exam.showResultForEachQuestion && this.question?.isAnswered) as boolean;
  }

  isItLastQuestion() : boolean {
    return this.question?.id === this.exam.noOfQuestions;
  }

  isItFirstQuestion() : boolean {
    return this.question?.id === 1;
  }

  canDisplaySubmitOption() : boolean {
    return !this.exam.showResultForEachQuestion && this.question?.id === this.exam.noOfQuestions;
  }

  private fetchQuestionsAndDisplayQuestion(examId : string, questionId: number) : void {
    this.dataService.getAllQuestions(examId).subscribe(data => {
      //TODO: Check whether data is not empty

        console.log(data);
        this.allQuestions = data;
        this.fetchAndDisplayQuestion(this.allQuestions, questionId);
      });
  }

  private fetchAndDisplayQuestion(questions : Question[], questionId : number) : void {
    //TODO check whether question is not empty

    this.question = questions.find(question => question.id === +questionId) as Question;
  }

}

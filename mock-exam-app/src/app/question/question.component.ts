import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../entity/Exam.enity';
import { Question } from '../entity/Question.entity';
import { DataServiceService } from '../services/data-service.service';
import { PersistentService } from '../services/persistent.service';

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
    private persistentService: PersistentService,
    private router: Router, private actvatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.actvatedRoute.paramMap.subscribe(params => {
      const examId = params.get('examId') as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
      //TODO check Exam ID is valid
      const questionId = params.get('questionId');
      if ( examId && questionId ) {
        console.log('Question id : ' + questionId);
        this.setQuestion(examId, +questionId);
      } else {
        console.error('Invalid Question ID..!');
      }

    });
  }

  moveToNextQuestion() : void {
    if( this.exam.noOfQuestions <= this.question.id+1) {
      this.router.navigate([`exam/${this.exam.id}/question/`, this.question.id+1]);
    }

  }

  moveToPrevQuestion() : void {
    if (this.question.id >= 1) {
      this.router.navigate([`exam/${this.exam.id}/question/`, this.question.id-1]);
    }
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
    return this.question?.id === this.exam.noOfQuestions;
  }

  private setQuestion(examId : string, questionId: number) : void {
    this.persistentService.getQuestion(examId, questionId).then(question => this.question = question);
  }

}

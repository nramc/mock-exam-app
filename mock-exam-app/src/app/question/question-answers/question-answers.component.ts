import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/entity/Answer.entity';
import { Exam } from 'src/app/entity/Exam.enity';
import { Question } from 'src/app/entity/Question.entity';

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {

  @Input()
  exam!: Exam;
  @Input()
  question!: Question;

  constructor() {
   }

  ngOnInit(): void {
  }

  eventAnswered(event:any, answer: Answer) : void {

    if (!this.question.selectedAnswer) {
      this.question.selectedAnswer =  [];
    }

    if ( event.target.checked ) {
      this.question.selectedAnswer.push(answer.id);
    } else {
      this.question.selectedAnswer?.splice(this.question.selectedAnswer.indexOf(answer.id), 1);
    }
  }

  isAnswerSelected(optionId : string) : boolean {
    return this.question.selectedAnswer?.includes(optionId) as boolean;
  }

  canDisableInput() : boolean {
    return this.exam.isSubmitted || (this.exam.showResultForEachQuestion && this.question.isQuestionAnswerd) as boolean;
  }

}

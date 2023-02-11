import {Component, Input, OnInit} from '@angular/core';
import {Answer} from 'src/app/entity/Answer.entity';
import {PracticeExam} from "../../domain/practice-exam.model";
import {PracticeQuestion} from "../../domain/practice-question.model";

@Component({
  selector: 'app-question-answers',
  templateUrl: './question-answers.component.html',
  styleUrls: ['./question-answers.component.scss']
})
export class QuestionAnswersComponent implements OnInit {

  @Input()
  exam!: PracticeExam;
  @Input()
  question!: PracticeQuestion;

  constructor() {
  }

  ngOnInit(): void {
  }

  eventAnswered(event: any, answer: Answer): void {


  }

  isAnswerSelected(optionId: string): boolean {
    return false
  }

  canDisableInput(): boolean {
    //return this.exam.isSubmitted || (this.exam.showResultForEachQuestion && this.question.isQuestionAnswerd) as boolean;
    return true;
  }

}

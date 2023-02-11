import {Component, Input, OnInit} from '@angular/core';
import {PracticeQuestion} from "../../domain/practice-question.model";
import {PracticeExam} from "../../domain/practice-exam.model";

@Component({
  selector: 'app-question-solution',
  templateUrl: './question-solution.component.html',
  styleUrls: ['./question-solution.component.scss']
})
export class QuestionSolutionComponent implements OnInit {

  @Input()
  exam!: PracticeExam;
  @Input()
  question!: PracticeQuestion;
  constructor() {
  }

  ngOnInit(): void {
  }

  isAnswerCorrect(): boolean {
    return this.question.options.every(option => option.isCorrectAnswer == option.isSelected);
  }


}

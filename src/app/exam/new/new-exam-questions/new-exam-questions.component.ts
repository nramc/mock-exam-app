import {Component, OnInit} from '@angular/core';
import {Question} from "../../../domain/question.model";
import {Option} from "../../../domain/option.model";
import {v4 as uuid} from 'uuid';

@Component({
  selector: 'app-new-exam-questions',
  templateUrl: './new-exam-questions.component.html',
  styleUrls: ['./new-exam-questions.component.scss']
})
export class NewExamQuestionsComponent implements OnInit {
  defaultOption: Option = {
    id: '',
    text: '',
    isCorrectAnswer: false
  };
  defaultQuestion: Question = {
    id: '',
    description: '',
    hasMultipleAnswers: false,
    options: [Object.assign({}, this.defaultOption, {id: uuid()})]
  };
  newQuestion: Question = Object.assign({}, this.defaultQuestion);

  ngOnInit(): void {
    // placeholder
  }

  saveQuestion(): void {
    console.log(this.newQuestion)
  }

  addOption(index: number): void {
    this.newQuestion.options.splice(
      index + 1,
      0,
      Object.assign({}, this.defaultOption, {id: uuid()}))
  }

  removeOption(index: number, item: Option) {
    this.newQuestion.options.splice(index, 1)
  }

  fnTracedByForOption(index: number, item: Option) {
    return item?.id;
  }

  generateQuestionId(): void {
    this.newQuestion.id = uuid();
  }

  toggleMultipleAnswerField() {
    this.newQuestion.hasMultipleAnswers = this.newQuestion.options.filter(option => option.isCorrectAnswer).length > 1
  }

}

import {Component, Inject, OnInit} from '@angular/core';
import {v4 as uuid} from "uuid";
import {Option} from "../../../domain/option.model";
import {Question} from "../../../domain/question.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<NewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: Question }) {
    console.log(data.question)

  }

  ngOnInit(): void {

    console.log(this.newQuestion)
  }

  defaultOption: Option = {
    id: '',
    text: '',
    isCorrectAnswer: false
  };
  newQuestion: Question = Object.assign({}, {
    id: '',
    description: '',
    hasMultipleAnswers: false,
    options: [Object.assign({}, this.defaultOption, {id: uuid()})]
  }, this.data.question);

  saveQuestion(): void {
    console.log(this.newQuestion)
  }

  addOption(index: number): void {
    this.newQuestion.options.splice(
      index + 1,
      0,
      Object.assign({}, this.defaultOption, {id: uuid()}))
  }

  removeOption(index: number, _item: Option) {
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

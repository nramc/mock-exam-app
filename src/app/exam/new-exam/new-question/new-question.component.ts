import {Component, Inject} from '@angular/core';
import {v4 as uuid} from "uuid";
import {Option} from "../../../domain/option.model";
import {Question} from "../../../domain/question.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {TEXT_EDITOR_CONFIG} from "../../../config/text-editor-config";

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.scss']
})
export class NewQuestionComponent {
  editorConfig: AngularEditorConfig = TEXT_EDITOR_CONFIG;

  constructor(
    public dialogRef: MatDialogRef<NewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: Question }) {
    console.log(data.question)

  }

  defaultOption: Option = {
    id: '',
    text: '',
    isCorrectAnswer: false
  };
  newQuestion: Question = Object.assign({}, {
    id: '',
    title: '',
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

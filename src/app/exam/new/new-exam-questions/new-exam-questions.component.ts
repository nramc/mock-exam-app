import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from "../../../domain/question.model";
import {Option} from "../../../domain/option.model";
import {v4 as uuid} from 'uuid';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Exam} from "../../../domain/exam.model";
@Component({
  selector: 'app-new-exam-questions',
  templateUrl: './new-exam-questions.component.html',
  styleUrls: ['./new-exam-questions.component.scss']
})
export class NewExamQuestionsComponent implements OnInit, AfterViewInit {
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

  displayedColumns: string[] = ['id', 'description', 'hasMultipleAnswers', 'actions'];
  exam: Exam | undefined;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>([]);


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Question>(this.exam?.questions);
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

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

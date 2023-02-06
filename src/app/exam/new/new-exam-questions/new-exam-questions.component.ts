import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Question} from "../../../domain/question.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {Exam} from "../../../domain/exam.model";
import {MatDialog} from "@angular/material/dialog";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {DisplaySolutionOption} from "../../../domain/display-solution-option";

@Component({
  selector: 'app-new-exam-questions',
  templateUrl: './new-exam-questions.component.html',
  styleUrls: ['./new-exam-questions.component.scss']
})
export class NewExamQuestionsComponent implements OnInit, AfterViewInit {
  constructor(public dialog: MatDialog) {
  }

  displayedColumns: string[] = ['id', 'description', 'hasMultipleAnswers', 'actions'];
  // TODO test data
  exam: Exam = {
    id: '',
    title: '',
    description: '',
    tags: [],
    solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
    noOfQuestions: 0,
    passScore: 70,
    questions: []
  };

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatTable) table: MatTable<Question> | undefined;

  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>([]);
  wrapDescription: boolean = true;


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Question>(this.exam?.questions);
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    // placeholder
  }

  addQuestion(): void {

    const dialogRef = this.dialog.open(NewQuestionComponent, {
      data: {
        question: {}
      },
      disableClose: true,
      width: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result as Question);
      this.exam?.questions.push(result);
      this.dataSource.data= this.exam.questions;
      this.table?.renderRows();
    });
  }

}

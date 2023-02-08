import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {Question} from "../../../domain/question.model";
import {MatPaginator} from "@angular/material/paginator";
import {MatTable, MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {NewQuestionComponent} from "../new-question/new-question.component";
import {NewExamService} from "../services/new-exam.service";

@Component({
  selector: 'app-new-exam-questions',
  templateUrl: './new-exam-questions.component.html',
  styleUrls: ['./new-exam-questions.component.scss']
})
export class NewExamQuestionsComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    public newExamService: NewExamService
  ) {
  }

  displayedColumns: string[] = ['id', 'description', 'hasMultipleAnswers', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatTable) table: MatTable<Question> | undefined;

  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>([]);
  wrapDescription: boolean = true;


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Question>(this.newExamService.getExam()?.questions);
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
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
      this.newExamService.addQuestion(result)
      this.dataSource.data = this.newExamService.getExam().questions;
      this.table?.renderRows();
    });
  }

}

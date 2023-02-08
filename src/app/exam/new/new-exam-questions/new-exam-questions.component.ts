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
  displayedColumns: string[] = ['id', 'description', 'hasMultipleAnswers', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Question>;

  dataSource: MatTableDataSource<Question> = new MatTableDataSource<Question>();
  wrapDescription: boolean = true;

  constructor(
    public dialog: MatDialog,
    public newExamService: NewExamService
  ) {
  }


  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Question>(this.newExamService.getExam()?.questions);
    this.dataSource.paginator = this.paginator;
  }

  openAddQuestionDialog(): void {
    this.openAddOrEditQuestionDialog({});
  }

  openUpdateQuestionDialog(question: Question): void {
    this.openAddOrEditQuestionDialog(question);
  }

  private openAddOrEditQuestionDialog(question: Question | {}) {
    const dialogRef = this.dialog.open(NewQuestionComponent, {
      data: {
        question: question
      },
      disableClose: true,
      width: "100%"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result as Question);
      this.newExamService.saveOrUpdateQuestion(result)
      this.dataSource.data = this.newExamService.getExam().questions;
      this.table?.renderRows();
    });
  }

}

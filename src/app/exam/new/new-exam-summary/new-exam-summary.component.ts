import {Component} from '@angular/core';
import {Exam} from "../../../domain/exam.model";
import {NewExamService} from "../services/new-exam.service";
import {DisplaySolutionOption} from "../../../domain/display-solution-option";

@Component({
  selector: 'app-new-exam-summary',
  templateUrl: './new-exam-summary.component.html',
  styleUrls: ['./new-exam-summary.component.scss']
})
export class NewExamSummaryComponent {
  exam: Exam;
  constructor(private newExamService:NewExamService) {
    this.exam = newExamService.getExam();
    newExamService.getExam$().subscribe(data => {
      this.exam = data;
    })
  }

  solutionDisplayOption = DisplaySolutionOption;

  downloadDataAsJsonFile(): void {
    let jsonData = JSON.stringify(this.exam);
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(jsonData));
    a.setAttribute('download', this.exam?.title + '.json');
    a.click()
  }

}

import {Component} from '@angular/core';
import {NewExamService} from "../services/new-exam.service";
import {Observable, of} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import {Exam} from "../../../domain/exam.model";

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {
  stepperOrientation: Observable<StepperOrientation>;
  exam: Exam | undefined;

  constructor(private newExamService: NewExamService,
              private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
    this.exam = newExamService.getExam();
  }

  hasAnyErrorInDetailsForm(): Observable<boolean> {
    return of(!this.newExamService.hasValidExamDetails());
  }

  downloadDataAsJsonFile(): void {
    let jsonData = JSON.stringify(this.exam);
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(jsonData));
    a.setAttribute('download', this.exam?.title + '.json');
    a.click()
  }

}

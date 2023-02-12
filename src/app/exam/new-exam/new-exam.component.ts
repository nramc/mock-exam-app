import {Component} from '@angular/core';
import {NewExamService} from "./services/new-exam.service";
import {Observable, of} from "rxjs";
import {StepperOrientation} from "@angular/cdk/stepper";
import {BreakpointObserver} from "@angular/cdk/layout";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {
  stepperOrientation: Observable<StepperOrientation>;

  constructor(private newExamService: NewExamService,
              private breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  hasAnyErrorInDetailsForm(): Observable<boolean> {
    return of(!this.newExamService.hasValidExamDetails());
  }


}

import {Component} from '@angular/core';
import {NewExamService} from "../services/new-exam.service";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-new-exam',
  templateUrl: './new-exam.component.html',
  styleUrls: ['./new-exam.component.scss']
})
export class NewExamComponent {
  constructor(private newExamService: NewExamService) {
  }

  hasAnyErrorInDetailsForm(): Observable<boolean> {
    return of(! this.newExamService.hasValidExamDetails());
  }
}

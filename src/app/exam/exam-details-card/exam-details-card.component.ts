import {Component, Input} from '@angular/core';
import {Exam} from "../../domain/exam.model";
import {TimeUtils} from "../../utils/time.utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exam-details-card',
  templateUrl: './exam-details-card.component.html',
  styleUrls: ['./exam-details-card.component.scss']
})
export class ExamDetailsCardComponent {
  @Input()
  exam!: Exam;

  constructor(private router: Router) {
  }

  public gotoExam(exam: Exam): void {
    this.router.navigate(['/exam', exam.id]);
  }

  public getApproxExamDuration(exam: Exam) {
    return TimeUtils.getExamDuration(exam.noOfQuestions);
  }
}

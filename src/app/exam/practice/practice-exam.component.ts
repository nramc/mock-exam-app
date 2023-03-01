import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataServiceService} from '../../services/data-service.service';
import {PersistentService} from '../../services/persistent.service';
import {Exam} from "../../domain/exam.model";
import {DisplaySolutionOption} from "../../domain/display-solution-option";
import {TimeUtils} from "../../utils/time.utils";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-practice-exam',
  templateUrl: './practice-exam.component.html',
  styleUrls: ['./practice-exam.component.scss']
})
export class PracticeExamComponent implements OnInit {
  solutionDisplayOption = DisplaySolutionOption;
  exam!: Exam;

  constructor(private dataService: DataServiceService,
              private persistentService: PersistentService,
              private notificationService: NotificationService,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const examId = params.get("examId") as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
    });
    if (!this.exam || !this.exam.id) {
      this.notificationService.errorWithHomeNavigation({
          message: 'Practice Exam is invalid. Please try again later.'
        }
      );

    }
  }

  public async startExam(): Promise<void> {
    await this.persistentService.initializeExam(this.exam)
      .then(practiceExam => this.router
        .navigate(['question', 1], {relativeTo: this.activatedRoute}));
  }

  public getApproxExamDuration() {
    return TimeUtils.getExamDuration(this.exam.noOfQuestions);
  }

}

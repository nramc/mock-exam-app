import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertType} from '../alert-model/alert-model.component';
import {DataServiceService} from '../services/data-service.service';
import {Exam} from "../domain/exam.model";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams: Exam[] | undefined;

  constructor(
    private dataService: DataServiceService,
    private router: Router,
    private notificationService: NotificationService) {

  }


  ngOnInit(): void {
    this.exams = this.dataService.getAllExams();
    if (!this.exams || this.exams.length == 0) {
      this.notificationService.error({
        type: AlertType.INFO,
        message: 'Practice exams are not available at the moment. Please try again later.'
      });
    }
  }

  searchExams(searchKeyWord: string) {
    this.exams = this.dataService.getExamsByKeyword(searchKeyWord);
  }

}

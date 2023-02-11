import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertModelComponent} from '../../alert-model/alert-model.component';
import {DataServiceService} from '../../services/data-service.service';
import {PersistentService} from '../../services/persistent.service';
import {Exam} from "../../domain/exam.model";
import {DisplaySolutionOption} from "../../domain/display-solution-option";

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
              private matDialog: MatDialog,
              private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let examId = params.get("examId") as string;
      this.exam = this.dataService.getExamById(examId) as Exam;
    });
    if (!this.exam || !this.exam.id) {
      const dialogRef = this.matDialog.open(AlertModelComponent, {
        data: {
          title: 'Error',
          message: 'Practice Exam is invalid. Please try again later.'
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        this.router.navigate(['/', result]);
      });
    }
  }

  public async startExam(): Promise<void> {
    await this.persistentService.initializeExam(this.exam)
      .then(practiceExam => this.router
        .navigate(['question', 1], {relativeTo: this.activatedRoute}));
  }

}

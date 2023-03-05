import {Component, ViewChild} from '@angular/core';
import {MatAccordion} from "@angular/material/expansion";
import {LearningPathDataService} from "../services/learning-path.data.service";
import {LearningPath} from "../domain/learning-path.model";
import {Exam} from "../domain/exam.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-learning-path-component',
  templateUrl: './learning-path.component.html',
  styleUrls: ['./learning-path.component.scss']
})
export class LearningPathComponent {
  allLearningPaths: LearningPath[] = [];
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor(private learningPathDataService: LearningPathDataService,
              private router: Router) {
    this.allLearningPaths = learningPathDataService.getAllLearningPaths();
  }


  searchLearningPaths(searchKeyWord: string) {
    console.log("yet to be handled: ", searchKeyWord)
  }

  gotoPracticeExam(exam: Exam) {
    this.router.navigate(['/exam', exam.id]);
  }
}

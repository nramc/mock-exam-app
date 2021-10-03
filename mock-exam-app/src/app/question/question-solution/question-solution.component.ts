import { Component, Input, OnInit } from '@angular/core';
import { Exam } from 'src/app/entity/Exam.enity';
import { Question } from 'src/app/entity/Question.entity';

@Component({
  selector: 'app-question-solution',
  templateUrl: './question-solution.component.html',
  styleUrls: ['./question-solution.component.scss']
})
export class QuestionSolutionComponent implements OnInit {

  @Input()
  exam!: Exam;
  @Input()
  question!: Question;
  constructor() { }

  ngOnInit(): void {
  }

}

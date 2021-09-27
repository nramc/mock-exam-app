import { Component, Input, OnInit } from '@angular/core';
import { Question } from 'src/app/entity/Question.entity';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {

  @Input()
  question! : Question;
  constructor() { }

  ngOnInit(): void {
  }

}

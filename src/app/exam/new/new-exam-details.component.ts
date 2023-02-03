import {Component, OnInit} from '@angular/core';
import {Exam} from "../../domain/exam.model";
import {v4 as uuid} from 'uuid';
import {DisplaySolutionOption} from "../../domain/display-solution-option";

@Component({
  selector: 'app-exam-preview',
  templateUrl: './new-exam-details.component.html',
  styleUrls: ['./new-exam-details.component.scss']
})
export class NewExamDetailsComponent implements OnInit{

  solutionDisplayOption = DisplaySolutionOption;
  exam!:Exam;

  // TODO for testing created dummy exam object
  ngOnInit(): void {
    this.exam = {
      id: uuid(),
      title: 'Python Hello World',
      description: 'This is very basic python hello world..!',
      tags: ['python', 'basic', 'fundamental'],
      solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
      noOfQuestions: 10,
      passScore: 69,
      questions:[]
    };
  }

  generateID(): void {
    this.exam.id = uuid();
  }

}

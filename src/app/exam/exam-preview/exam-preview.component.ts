import {Component, OnInit} from '@angular/core';
import {Exam} from "../../domain/exam.model";
import {v4 as uuid} from 'uuid';
import {DisplaySolutionOption} from "../../domain/display-solution-option";

@Component({
  selector: 'app-exam-preview',
  templateUrl: './exam-preview.component.html',
  styleUrls: ['./exam-preview.component.scss']
})
export class ExamPreviewComponent implements OnInit{

  solutionDisplayOption = DisplaySolutionOption;
  exam!:Exam;

  // TODO for testing created dummy exam object
  ngOnInit(): void {
    this.exam = {
      id: uuid() as string,
      title: 'Python Hello World',
      description: 'This is very basic python hello world..!',
      tags: ['python', 'basic', 'fundamental'],
      solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
      noOfQuestions: 10,
      passScore: 69
    };
  }

  generateID(): void {
    this.exam.id = uuid();
  }

}

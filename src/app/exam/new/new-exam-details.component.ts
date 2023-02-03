import {Component, OnInit} from '@angular/core';
import {Exam} from "../../domain/exam.model";
import {v4 as uuid} from 'uuid';
import {DisplaySolutionOption} from "../../domain/display-solution-option";

@Component({
  selector: 'app-exam-new',
  templateUrl: './new-exam-details.component.html',
  styleUrls: ['./new-exam-details.component.scss']
})
export class NewExamDetailsComponent implements OnInit {

  solutionDisplayOption = DisplaySolutionOption;
  exam!: Exam;

  // TODO for testing created dummy exam object
  private selectedFile: any;

  ngOnInit(): void {
    this.exam = {
      id: uuid(),
      title: 'Python Hello World',
      description: 'This is very basic python hello world..!',
      tags: ['python', 'basic', 'fundamental'],
      solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
      noOfQuestions: 10,
      passScore: 69,
      questions: []
    };
  }

  generateID(): void {
    this.exam.id = uuid();
  }

  uploadDataFromFile(): void {
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        console.log(JSON.parse(fileReader.result));
        this.exam = JSON.parse(fileReader.result)

      }
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
  }

  saveAndProceed(): void {
    localStorage.setItem("new-exam-details", JSON.stringify(this.exam))
  }

  downloadDataAsJsonFile(): void {
    let jsonData = JSON.stringify(this.exam);
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(jsonData));
    a.setAttribute('download', "filename.json");
    a.click()
  }

}

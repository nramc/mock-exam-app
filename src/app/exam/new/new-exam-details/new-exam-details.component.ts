import {Component} from '@angular/core';
import {Exam} from "../../../domain/exam.model";
import {v4 as uuid} from 'uuid';
import {DisplaySolutionOption} from "../../../domain/display-solution-option";
import {NewExamService} from "../services/new-exam.service";

@Component({
  selector: 'app-exam-new',
  templateUrl: './new-exam-details.component.html',
  styleUrls: ['./new-exam-details.component.scss']
})
export class NewExamDetailsComponent {
  solutionDisplayOption = DisplaySolutionOption;
  // define default values
  exam: Exam = {
    id: '',
    title: '',
    description: '',
    tags: [],
    solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
    noOfQuestions: 0,
    passScore: 70,
    questions: []
  };

  private selectedFile: any;

  constructor(private newExamService: NewExamService) {
  }

  generateID(): void {
    this.exam.id = uuid();
  }

  uploadData(): void {
    if (this.selectedFile) {
      this.uploadDataFromFile();
    } else {
      this.uploadDataFromLocalStorage();
    }
  }

  uploadDataFromLocalStorage(): void {
    let data = JSON.parse(localStorage.getItem("new-exam-details")!);
    console.log(data);
    this.exam = data
  }

  uploadDataFromFile(): void {
    if (!this.selectedFile) return;
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      if (typeof fileReader.result === "string") {
        console.log(JSON.parse(fileReader.result));
        this.exam = JSON.parse(fileReader.result)

      } else {
        console.error("sorry, file content is not json string..!")
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
    localStorage.setItem("new-exam-details", JSON.stringify(this.exam));
    this.newExamService.saveExam(this.exam);
    console.log("Saved..!", this.exam);
  }

  downloadDataAsJsonFile(): void {
    let jsonData = JSON.stringify(this.exam);
    let a = document.createElement('a');
    a.setAttribute('href', 'data:text/plain;charset=utf-u,' + encodeURIComponent(jsonData));
    a.setAttribute('download', "filename.json");
    a.click()
  }

}

import {Component} from '@angular/core';
import {Exam} from "../../../domain/exam.model";
import {v4 as uuid} from 'uuid';
import {DisplaySolutionOption} from "../../../domain/display-solution-option";
import {NewExamService} from "../services/new-exam.service";
import {AngularEditorConfig} from "@kolkov/angular-editor";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {MatChipInputEvent} from "@angular/material/chips";
import {Difficulty} from "../../../domain/difficulty.model";
import {TEXT_EDITOR_CONFIG} from "../../../config/text-editor-config";

@Component({
  selector: 'app-exam-new',
  templateUrl: './new-exam-details.component.html',
  styleUrls: ['./new-exam-details.component.scss']
})
export class NewExamDetailsComponent {
  solutionDisplayOption = DisplaySolutionOption;
  examDifficulty = Object.values(Difficulty);
  readonly separatorKeysCodes = [ENTER, COMMA, SPACE] as const;

  // define default values
  exam: Exam = {
    id: '',
    title: '',
    description: '',
    imageUrl: 'assets/images/logo/python-logo.png',
    tags: [],
    solutionDisplayOption: DisplaySolutionOption.AFTER_QUESTION_SUBMISSION,
    noOfQuestions: 0,
    passScore: 70,
    difficulty: Difficulty.Easy,
    questions: []
  };
  editorConfig: AngularEditorConfig = TEXT_EDITOR_CONFIG;

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
    const data = JSON.parse(localStorage.getItem("new-exam-details")!);
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
    this.newExamService.saveExam(this.exam);
    localStorage.setItem("new-exam-details", JSON.stringify(this.exam));
    console.log("Saved..!", this.exam);
  }

  add(event: MatChipInputEvent): void {
    const newTag = (event.value || '').trim();

    if (newTag) {
      this.exam.tags.push(newTag);
    }

    // Clear the input value
    event.chipInput.clear();
  }

  remove(tag: string): void {
    const index = this.exam.tags.indexOf(tag);

    if (index >= 0) {
      this.exam.tags.splice(index, 1);
    }
  }

}

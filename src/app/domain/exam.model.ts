import {DisplaySolutionOption} from "./display-solution-option";
import {Question} from "./question.model";

export interface Exam {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  noOfQuestions: number;
  solutionDisplayOption: DisplaySolutionOption;
  passScore: number
  questions: Question[]

}

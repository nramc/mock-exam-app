import {DisplaySolutionOption} from "./display-solution-option";

export interface Exam {
  id: string;
  title: string;
  description: string;
  tags: string[];
  noOfQuestions: number;
  solutionDisplayOption: DisplaySolutionOption;
  passScore: number

}

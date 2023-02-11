import {DisplaySolutionOption} from "./display-solution-option";
import {PracticeQuestion} from "./practice-question.model";

export interface PracticeExam {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  noOfQuestions: number;
  solutionDisplayOption: DisplaySolutionOption;
  passScore: number
  questions: PracticeQuestion[],
  isSubmitted?: boolean
}

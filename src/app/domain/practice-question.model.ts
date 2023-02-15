import {PracticeOption} from "./practice-option.model";


export interface PracticeQuestion {
  id: string,
  description: string,
  hasMultipleAnswers: boolean
  options: PracticeOption[],
  isQuestionSubmitted?: boolean,
  isQuestionAnswered?: boolean;
  rowNo: number;
}

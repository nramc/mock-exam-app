import { Answer } from "./Answer.entity";
import { Solution } from "./Solution.entity";

export interface Question {
  examId : string,
  id : number,
  text : string,
  code? : string,
  textAfterCode? : string,
  isMultipleAnswerQust : boolean,
  options : Answer[],
  solution : Solution,
  selectedAnswer?: Array<string>;
}

import { Question } from "./Question.entity";

export interface Exam {

  id: string;
  name: string;
  description: string;
  labels: string;
  format: string;
  noOfQuestions: number;
  durationInMin: number;
  requiredScoreInPercent: number,
  showResultForEachQuestion : boolean,
  logoUrl: string;
  isSubmitted?: boolean;
  questions?: Question[]

}

import {PracticeExam} from "./practice-exam.model";

export interface Summary {
  exam: PracticeExam;
  result: boolean;
  score: number;
  correctAnswers: number;
}

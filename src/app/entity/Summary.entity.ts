import {PracticeExam} from "../domain/practice-exam.model";

export interface Summary {
  exam: PracticeExam;
  result: boolean;
  score: number;
  correctAnswers: number;
}

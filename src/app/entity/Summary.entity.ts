import {PracticeExam} from "../domain/practice-exam.model";

export interface Summary {
  exam: PracticeExam;
  result: "Pass" | "Fail";
  score: number;
  correctAnswer: number;
  title: string;
  iconUrl: string;
}

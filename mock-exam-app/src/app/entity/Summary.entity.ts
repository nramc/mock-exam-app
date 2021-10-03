import { Exam } from "./Exam.enity";

export interface Summary {
  exam : Exam;
  result : "Pass" | "Fail";
  score : number;
  correctAnswer: number;
  title: string;
  iconUrl: string;
}

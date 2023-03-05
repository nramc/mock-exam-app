import {Exam} from "./exam.model";

export interface LearningPath {
  id: string
  title: string
  description: string
  imageUrl: string
  exams?: Exam[]

}

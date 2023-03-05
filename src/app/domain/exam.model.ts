import {Question} from "./question.model";

export interface Exam {
  id: string
  title: string
  description: string
  imageUrl: string
  tags: string[]
  noOfQuestions: number
  solutionDisplayOption: string
  passScore: number
  questions: Question[]
  difficulty: string
  learningPathId?: string

}

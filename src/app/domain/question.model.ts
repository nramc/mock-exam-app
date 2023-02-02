import {Option} from "./option.model";

export interface Question {
  id: string,
  description: string,
  hasMultipleAnswers: boolean
  options: Option[]
}

import { Question } from "../entity/Question.entity";

export class AppUtils {
  public static isAnswerCorrect(question : Question) : boolean {
    if ( question?.isMultipleAnswerQust ) {
      return question?.selectedAnswer?.length == question.solution.correctAnswers.length
        && JSON.stringify(question.solution.correctAnswers.sort()) == JSON.stringify(question.selectedAnswer.sort())
    }
    else {
      return question?.selectedAnswer ? question.solution.correctAnswers[0] == question?.selectedAnswer[0] : false;
    }
  }
}

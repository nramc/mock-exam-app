export class TimeUtils {

  public static getExamDuration(noOfQuestions: number): number {
    const approxTimeForEachQuestion = 30;
    const durationInSeconds = noOfQuestions * approxTimeForEachQuestion;
    const durationInMins = Math.fround(durationInSeconds / 60);
    // duration in terms of 5's as whole number
    return Math.floor(Math.fround(durationInMins / 5 * 5));
  }

}

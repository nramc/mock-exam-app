export class TimeUtils {

  public static getExamDuration(noOfQuestions: number): number {
    const approxTimeForEachQuestion = 30;
    let durationInSeconds = noOfQuestions * approxTimeForEachQuestion;
    let durationInMins = Math.floor(durationInSeconds / 60);
    // duration in terms of 5's as whole number
    return Math.floor(durationInMins / 5) * 5;
  }

}

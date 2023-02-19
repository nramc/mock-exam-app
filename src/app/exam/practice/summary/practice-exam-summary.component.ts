import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PersistentService} from 'src/app/services/persistent.service';
import {PracticeQuestion} from "../../../domain/practice-question.model";
import {Summary} from "../../../domain/practice-exam-summary.model";

@Component({
  selector: 'app-practice-exam-summary',
  templateUrl: './practice-exam-summary.component.html',
  styleUrls: ['./practice-exam-summary.component.scss']
})
export class PracticeExamSummaryComponent {
  summary!: Summary;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private persistentService: PersistentService
  ) {
    this.activatedRoute.paramMap.subscribe(async params => {
      const examId = params.get('examId') as string;
      const exam = await this.persistentService.getPracticeExam(examId);
      const correctAnswers = this.getQuestionsAnsweredCorrectly(exam.questions);
      const percentage = Math.ceil((correctAnswers.length / exam?.noOfQuestions) * 100);
      const result = this.isSecured(percentage, exam?.passScore);

      this.summary = {
        exam: exam,
        correctAnswers: correctAnswers.length,
        result: result,
        score: percentage,
      };

    });
  }

  public viewSolutions(): void {
    this.router.navigate([`exam/${this.summary.exam.id}/question/`, 1]);
  }

  public gotoHome(): void {
    this.router.navigate(['/']);
  }

  private getQuestionsAnsweredCorrectly(questions: PracticeQuestion[]): PracticeQuestion[] {
    return questions.filter(question => question.options.every(opt => Boolean(opt.isSelected) === Boolean(opt.isCorrectAnswer)));
  }

  private isSecured(actualPercentage: number, requiredPercentage: number): boolean {
    return actualPercentage >= requiredPercentage
  }

}

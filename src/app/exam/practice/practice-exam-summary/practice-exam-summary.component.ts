import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Summary} from 'src/app/entity/Summary.entity';
import {PersistentService} from 'src/app/services/persistent.service';
import {PracticeExam} from "../../../domain/practice-exam.model";
import {PracticeQuestion} from "../../../domain/practice-question.model";

@Component({
  selector: 'app-practice-exam-summary',
  templateUrl: './practice-exam-summary.component.html',
  styleUrls: ['./practice-exam-summary.component.scss']
})
export class PracticeExamSummaryComponent implements OnInit {

  summary!: Summary;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private persistentService: PersistentService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.activatedRoute.paramMap.subscribe(async params => {
      const examId = params.get('examId') as string;
      const exam = await this.persistentService.getPracticeExam(examId) as PracticeExam;
      const correctAnswers = this.getQuestionsAnsweredCorrectly(exam.questions);
      const percentage = Math.ceil((correctAnswers.length / exam?.noOfQuestions) * 100);
      const result = this.getResult(percentage, exam?.passScore);
      const title = result == 'Pass' ? 'Congratulation..!' : 'Sorry..! Better Luck Next Time';
      const iconUrl = result == 'Pass' ? 'assets/images/success-animi2.gif' : 'assets/images/fail-animi.gif';

      this.summary = {
        exam: exam,
        correctAnswer: correctAnswers.length,
        result: result,
        score: percentage,
        title: title,
        iconUrl: iconUrl
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


    return questions.filter(question => question.options.every(opt => opt.isSelected == opt.isCorrectAnswer));
  }

  private getResult(actualPercentage: number, requiredPercentage: number): 'Pass' | 'Fail' {
    return actualPercentage >= requiredPercentage ? 'Pass' : 'Fail'
  }

}

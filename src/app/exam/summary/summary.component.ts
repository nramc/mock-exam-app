import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/entity/Exam.enity';
import { Question } from 'src/app/entity/Question.entity';
import { Summary } from 'src/app/entity/Summary.entity';
import { PersistentService } from 'src/app/services/persistent.service';
import { AppUtils } from 'src/app/utils/AppUtils';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  summary!: Summary;

  constructor(
    private router : Router,
    private actvatedRoute : ActivatedRoute,
    private persistantService : PersistentService
  ) {}

  ngOnInit(): void {
    this.actvatedRoute.paramMap.subscribe(params => {
      const examId = params.get('examId') as string;
      const exam = this.persistantService.getExam(examId) as Exam;
      const allQuestions = this.persistantService.getAllQuestions(examId);
      const correctAnswers = this.getQuestionsAnsweredCorrectly(allQuestions);
      const percentage = Math.ceil((correctAnswers.length/exam?.noOfQuestions) * 100);
      const result = this.getResult(percentage, exam?.requiredScoreInPercent);
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

  public viewSolutions() : void {
    this.router.navigate([`exam/${this.summary.exam.id}/question/`, 1]);
  }

  public gotoHome() : void {
    this.router.navigate(['/']);
  }

  private getQuestionsAnsweredCorrectly(questions : Question[]) : Question[] {


    return questions.filter(question => AppUtils.isAnswerCorrect(question));
  }

  private getResult(actualPercentage : number, requiredPercentage : number) : 'Pass' | 'Fail' {
    return actualPercentage >= requiredPercentage ? 'Pass' : 'Fail'
  }

}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PracticeExamComponent} from './exam/practice/practice-exam.component';
import {PracticeExamSummaryComponent} from './exam/practice/practice-exam-summary/practice-exam-summary.component';
import {HomeComponent} from './home/home.component';

import {PracticeExamQuestionComponent} from './exam/practice/practice-exam-question/practice-exam-question.component';
import {NewExamQuestionsComponent} from "./exam/new-exam/new-exam-questions/new-exam-questions.component";
import {NewExamComponent} from "./exam/new-exam/new-exam.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {
    path: 'exam',
    children: [
      {
        path: 'new',
        children: [
          {path: '', component: NewExamComponent},
          {path: "questions", component: NewExamQuestionsComponent}
        ]
      },

      {path: ':examId', component: PracticeExamComponent},
      {path: ':examId/question/:questionId', component: PracticeExamQuestionComponent},
      {path: ':examId/summary', component: PracticeExamSummaryComponent}
    ]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

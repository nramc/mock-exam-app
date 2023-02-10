import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from './exam/exam.component';
import {SummaryComponent} from './exam/summary/summary.component';
import {HomeComponent} from './home/home.component';

import {QuestionComponent} from './question/question.component';
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

      {path: ':examId', component: ExamComponent},
      {path: ':examId/question/:questionId', component: QuestionComponent},
      {path: ':examId/summary', component: SummaryComponent}
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

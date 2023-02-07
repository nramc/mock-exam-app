import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { HomeComponent } from './home/home.component';
import { ExamComponent } from './exam/exam.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuestionDetailsComponent } from './question/question-details/question-details.component';
import { QuestionAnswersComponent } from './question/question-answers/question-answers.component';
import { QuestionSolutionComponent } from './question/question-solution/question-solution.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SummaryComponent } from './exam/summary/summary.component';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertModelComponent } from './alert-model/alert-model.component';
import { NewExamDetailsComponent } from './exam/new/new-exam-details.component';
import { NewExamQuestionsComponent } from './exam/new/new-exam-questions/new-exam-questions.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import { NewQuestionComponent } from './exam/new/new-question/new-question.component';
import { NewExamComponent } from './exam/new/new-exam/new-exam.component';
import {MatStepperModule} from "@angular/material/stepper";

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    HomeComponent,
    ExamComponent,
    QuestionDetailsComponent,
    QuestionAnswersComponent,
    QuestionSolutionComponent,
    SummaryComponent,
    AlertModelComponent,
    NewExamDetailsComponent,
    NewExamQuestionsComponent,
    NewQuestionComponent,
    NewExamComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FormsModule,
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatProgressBarModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatStepperModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PracticeExamQuestionComponent} from './exam/practice/question/practice-exam-question.component';
import {HomeComponent} from './home/home.component';
import {PracticeExamComponent} from './exam/practice/practice-exam.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {PracticeExamSummaryComponent} from './exam/practice/summary/practice-exam-summary.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {AlertModelComponent} from './alert-model/alert-model.component';
import {NewExamDetailsComponent} from './exam/new-exam/new-exam-details/new-exam-details.component';
import {NewExamQuestionsComponent} from './exam/new-exam/new-exam-questions/new-exam-questions.component';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {NewQuestionComponent} from './exam/new-exam/new-question/new-question.component';
import {NewExamComponent} from './exam/new-exam/new-exam.component';
import {MatStepperModule} from "@angular/material/stepper";
import {NewExamSummaryComponent} from './exam/new-exam/new-exam-summary/new-exam-summary.component';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import { PracticeExamQuestionAnswerComponent } from './exam/practice/question/answer/practice-exam-question-answer.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatChipsModule} from "@angular/material/chips";
import {AngularEditorModule} from "@kolkov/angular-editor";
import { FooterComponent } from './footer/footer.component';
import {TagListComponent} from "./components/tagname/tagname.component";
import { ExamDetailsCardComponent } from './exam/exam-details-card/exam-details-card.component';

@NgModule({
  declarations: [
    AppComponent,
    PracticeExamQuestionComponent,
    HomeComponent,
    PracticeExamComponent,
    PracticeExamSummaryComponent,
    AlertModelComponent,
    NewExamDetailsComponent,
    NewExamQuestionsComponent,
    NewQuestionComponent,
    NewExamComponent,
    NewExamSummaryComponent,
    PracticeExamQuestionAnswerComponent,
    FooterComponent,
    ExamDetailsCardComponent
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
        MatStepperModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatRadioModule,
        MatTooltipModule,
        MatChipsModule,
        AngularEditorModule,
        TagListComponent
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

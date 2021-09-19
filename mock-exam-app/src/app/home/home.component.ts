import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Exam } from '../entity/Exam.enity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams: Exam[] = [];



  ngOnInit(): void {
    let exam1 = new Exam();
    exam1.id = "exam1";
    exam1.name = "Java Certification Exam - Quick Practice Exam 1";
    exam1.description = "Quick Practice Exam to revise Java Basics";
    exam1.labels = "Java Basics";
    exam1.format = "Multiple Choice";
    exam1.durationInMin = 120;
    exam1.noOfQuestions = 20;
    exam1.logoUrl = "https://www.kindpng.com/picc/m/198-1984828_java-icon-transparent-hd-png-download.png";
    this.exams.push(exam1);

    let exam2 = { ...exam1};
    exam2.id = "exam002";
    exam2.name = "Java Certification Exam - Quick Practice Exam 2";
    this.exams.push(exam2);

    let exam3 = { ...exam1};
    exam3.id = "exam003";
    exam3.name = "Java Certification Exam - Quick Practice Exam 3";
    this.exams.push(exam3);

    let exam4 = { ...exam1};
    exam4.id = "exam004";
    exam4.name = "Java Certification Exam - Quick Practice Exam 4";
    this.exams.push(exam4);

    let exam5 = { ...exam1};
    exam5.id = "exam005";
    exam5.name = "Java Certification Exam - Quick Practice Exam 5";
    this.exams.push(exam5);

    let exam6 = { ...exam1};
    exam6.id = "exam006";
    exam6.name = "Java Certification Exam - Quick Practice Exam 6";
    this.exams.push(exam6);
  }

}

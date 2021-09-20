import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Exam } from '../entity/Exam.enity';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  exams!: Exam[];

  constructor(private dataService : DataServiceService, private router : Router) {

  }



  ngOnInit(): void {
    this.exams = this.dataService.getAllExams();
  }

  public gotoExam(exam : Exam) : void {
    this.router.navigate(['/exam', exam.id]);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(private router : Router, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
  }

  public startExam() : void {
    console.log('will redirect to question page');
    this.router.navigate(['question']);
  }

}

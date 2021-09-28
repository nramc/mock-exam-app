import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from '../entity/Exam.enity';
import { DataServiceService } from '../services/data-service.service';
import { PersistentService } from '../services/persistent.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  exam!: Exam;

  constructor(private dataService : DataServiceService,
    private persistentService : PersistentService,
    private router : Router, private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let examId = params.get("examId") as string;
      console.log('Exam -> examId '+ examId);
      this.exam = this.dataService.getExamById(examId) as Exam;
    });
    console.log(this.exam);
    if( !this.exam ) {
      console.log('ERROR: Unable to identify the exam');
    }
  }

  public async startExam() : Promise<void> {
    console.log('will redirect to question page');
    console.log(this.exam.showResultForEachQuestion);
    await this.persistentService.initializeExam(this.exam.id);
    console.log('fetch initiated');
    this.router.navigate(['question', 1], {relativeTo: this.activatedRoute});
  }

}

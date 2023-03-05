import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mock-exam';

  constructor(private router : Router){}

  public home() : void {
    this.router.navigate(['/']);
  }

  navigateToLearningPaths() : void {
    this.router.navigate(['/learning-path']);
  }

  myprofile() : void{
    window.open('https://myprofile.codewithram.dev');
  }

  newExam() {
    this.router.navigate(['/exam/new']);
  }
}

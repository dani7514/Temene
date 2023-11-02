import { Component } from '@angular/core';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-my-learning',
  templateUrl: './my-learning.component.html',
  styleUrls: ['./my-learning.component.css']
})
export class MyLearningComponent {
  courses:any[] = []
  constructor(private appservice: AppService){
      this.courses = this.appservice.user.courses_enrolled
      console.log(this.courses);
  }

}

import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';



@Component({
  selector: 'app-student-lists',
  templateUrl: './student-lists.component.html',
  styleUrls: ['./student-lists.component.css'],
})
export class StudentListsComponent implements OnInit {
    numStudent: number=10;
    students:any
    constructor(private appservice: AppService){}
    ngOnInit(): void {
      this.students = this.appservice.user.student;
      this.numStudent = this.appservice.user.student.length
    }
}

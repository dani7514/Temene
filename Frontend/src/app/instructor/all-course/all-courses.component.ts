import { Component ,OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';
import {AllCoursesService} from "./all-courses.service";
import {course} from './courseDto/course';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AllCoursesComponent implements OnInit {
  courses: any[]=[];
  constructor(private appservice: AppService){}
  ngOnInit(): void {
    this.courses = this.appservice.user.courses_created
  }

}

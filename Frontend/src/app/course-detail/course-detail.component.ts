import { Component, OnInit, ViewEncapsulation, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
  encapsulation:ViewEncapsulation.ShadowDom
})
export class CourseDetailComponent implements OnInit, AfterViewInit {

  courses :any;
  courseId:any;

  constructor(protected appservice: AppService, private activateRoute: ActivatedRoute, private route: Router){

  }
  ngOnInit(): void {
      this.courseId = this.activateRoute.snapshot.paramMap.get("id")
      this.appservice.getCourseDetail(this.courseId).subscribe(res=>{
        this.courses =  res
      })
  }
  
  ngAfterViewInit(): void {
       let s = document.createElement("script")
       s.type = "text/javascript"
       s.src=`/accordion.js`;

  }
  sendData(input:string){
      this.appservice.enroll(input)        
  }
}

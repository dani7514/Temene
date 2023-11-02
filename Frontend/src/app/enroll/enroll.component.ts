import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  courses :any;
  courseId:any;

  constructor(protected appservice: AppService , private activateRoute: ActivatedRoute ){

  }
  ngOnInit(): void {
    this.courseId = this.activateRoute.snapshot.paramMap.get("id")
    this.appservice.getCourseDetail(this.courseId).subscribe(res=>{
      this.courses =  res
    })
}




}

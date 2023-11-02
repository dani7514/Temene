import { Component, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/Services/app.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CreateCourseComponent {

  constructor(private appservice:AppService){

  }

  courseInfo :{title: string,
    price: string,
    duration: string,
    description: string,
    language: string,
  level: string } = {title: "",
    price: "",
    duration: "",
    description: "",
    language: "",
  level: "" }
  
  image: any;
  setImage(event: any){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.image = file;
      console.log(this.image)
    }
  }
  setTitle(input: string){
      this.courseInfo.title = input
  }
  setDiscription(input: string){
    this.courseInfo.description = input
  }
  setLanguage(input: string){
    this.courseInfo.language = input
  }
  setPrice(input: string){
    this.courseInfo.price = input
  }
  setDuration(input: string){
    this.courseInfo.duration = input;
  }
  setLevel(input: string){
    this.courseInfo.level = input
  }
  sendData(){
    console.log(this.courseInfo)
    this.appservice.createCourse(this.courseInfo, this.image)
  }
  

}


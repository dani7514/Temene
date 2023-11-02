import { Injectable } from '@angular/core';
import {course} from './courseDto/course';

@Injectable({
  providedIn: 'any'
})
export class AllCoursesService {

  constructor() { }
  courses: course[]=[
    {
      courseImage: "./assets/course1.svg",
      courseName: "Sensors and Acutators",
      numStudent: "8 students",
      lesson: "7 lesson"
    },
    {
      courseImage: "./assets/course2.svg",
      courseName: "Introduction to IOT",
      numStudent: "15 students",
      lesson: "5 lesson"
    },
    {
      courseImage: "./assets/course3.svg",
      courseName: "Design Concept UI/UX",
      numStudent: "10 students",
      lesson: "9 lesson"
    },
    {
      courseImage: "./assets/course2.svg",
      courseName: "Python for beginner",
      numStudent: "30 students",
      lesson: "10 lesson"
    },
    {
      courseImage: "./assets/course3.svg",
      courseName: "Design Concept UI/UX",
      numStudent: "10 students",
      lesson: "9 lesson"
    },
  ];

  getCourse(){
    return this.courses
  }
}

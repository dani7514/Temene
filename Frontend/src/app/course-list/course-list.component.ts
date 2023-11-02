import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
  providers: [AppService],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CourseListComponent implements OnInit{

  courses: any[] = [];


  searchFil: {high:number,
              low:number,
              level:string,
              language:string,
              search:string
}={high:1000,
  low:0,
  level:"",
  language:"",
  search:""
};

  constructor(private appservice: AppService){

  }
  
  ngOnInit(): void {
    this.appservice.getAllCourse().subscribe((res)=>{
      this.courses = res.courses
    }
  
    )
  }

  setLevel(input:string){
    this.searchFil.level = input
  }
  setLanguage(input:string){
    this.searchFil.language = input
  }
  setPriceRangeMin(input:string){

    this.searchFil.low = parseInt(input);

  }
  setPriceRangeMax(input:string){
    this.searchFil.high = parseInt(input)

  }
  setSearch(input:string){
    this.searchFil.search = input
  }


  sendData(){
    this.appservice.searchAndFilter(this.searchFil).subscribe(
      (res)=>{

        this.courses = res.courses
        console.log(this.courses)
      }
    )
    // this.searchFil= {high:1000,
    //   low:0,
    //   level:"",
    //   language:"",
    //   search:""
    // }
  }
  
}


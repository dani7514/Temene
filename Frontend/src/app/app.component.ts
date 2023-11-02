import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from './Services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges, DoCheck{
  title = 'temene';
  constructor(private router: Router, public appservice:AppService){
  }

  loggedIn:boolean = this.appservice.islogin;
  isInstructor:any;
  userId : any;
  image_link: string = "../assets/person1.svg";
  full_name: string = "";

  ngOnInit(){
    this.appservice.check().subscribe(
      (val) => {
        this.loggedIn = this.appservice.islogin;
        this.isInstructor = this.appservice.isInstructor;
      }
    );
    
    
    // setTimeout(() => {
     
    // }, 2000);
  
  }

  ngDoCheck(){
    this.loggedIn = this.appservice.islogin;
    this.isInstructor = this.appservice.isInstructor;
    this.image_link = this.appservice.user?.profile_picture? `http://127.0.0.1:3000/images/${this.appservice.user.profile_picture}` : "../assets/person1.svg";
    this.full_name = this.appservice.user?.first_name + " " + this.appservice.user?.last_name
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.loggedIn = this.appservice.islogin;
    this.isInstructor = this.appservice.isInstructor;
    // if(this.loggedIn){
    //   console.log("you looged in")
    //     this.isInstructor = this.appservice.isInstructor;
    //     this.userId = this.appservice.user._id;
    
    // }
    }
    logout(){
      localStorage.removeItem("token");
      this.appservice.reset();
    }
  SetQueryParam(){
    this.router.navigate(["/cart"], {queryParams:{studentId:this.userId}} )
  }



}

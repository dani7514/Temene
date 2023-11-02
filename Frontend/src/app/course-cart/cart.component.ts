import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent{


//   studentId: number = 0;
//   courseCart:{image:string, name:string, Instructor:string,price:string}[] = [];
//   totalPrice: number = 0;
//   constructor(private activatedRoute: ActivatedRoute, private appservice:AppService){

//   }
// ngOnInit(){
//   this.studentId =  Number(this.activatedRoute.snapshot.queryParamMap.get("studentId"));

// //   this.courseCart = this.appservice.getCourseCart()

// //                 for (let course of this.courseCart){

// //                   this.totalPrice += Number(course.price)
// //                 }

// // }
}

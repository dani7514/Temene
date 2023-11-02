import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HompepageComponent } from './home/hompepage.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about-us/about.component';
import { ProfileComponent } from './profile-managment/profile.component';
import { MyLearningComponent } from './mylearning/my-learning.component';
import { CartComponent } from './course-cart/cart.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { InstructorComponent } from './instructor/instructor.component';
import { StudentListsComponent } from './instructor/student-lists/student-lists.component';
import { CreateCourseComponent } from './instructor/create-course/create-course.component';
import { AllCoursesComponent } from './instructor/all-course/all-courses.component';
import { EnrollComponent } from './enroll/enroll.component';

const routes: Routes = [
                        {path:"",component:HompepageComponent, pathMatch:'full'},
                        {path:"home",component:HompepageComponent},
                        {path:"course-list",component:CourseListComponent},
                        {path:"login", component:  LoginComponent},
                        {path:"signup",component:RegisterComponent},
                        {path:"coursecart",component:CourseListComponent},
                        {path:"contactus",component:ContactUsComponent},
                        {path:"aboutus",component:AboutComponent},
                        {path:"Instructor", component:InstructorComponent, children:[
                                                        {path:"", component:StudentListsComponent, pathMatch:'full'},
                                                        {path:"students", component:StudentListsComponent},
                                                        {path:"allcourses", component:AllCoursesComponent},
                                                        {path:"createcourse", component:CreateCourseComponent,}

                                                      ]},
                       {path:"cart", component: CartComponent},
                       {path:"mylearning", component:MyLearningComponent},
                       {path:"Profile", component:  ProfileComponent},
                      {path:"coursedetail/:id",component:CourseDetailComponent},
                      {path: "enroll/:id", component: EnrollComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

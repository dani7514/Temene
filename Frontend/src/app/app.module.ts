import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about-us/about.component';
import { ProfileComponent } from './profile-managment/profile.component';
import { MyLearningComponent } from './mylearning/my-learning.component';
import { CartComponent } from './course-cart/cart.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HompepageComponent } from './home/hompepage.component';
import { InstructorComponent } from './instructor/instructor.component';
import { StudentListsComponent } from './instructor/student-lists/student-lists.component';
import { AllCoursesComponent } from './instructor/all-course/all-courses.component';
import { AppService } from './Services/app.service';
import { EnrollComponent } from './enroll/enroll.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HompepageComponent,
    ContactUsComponent,
    AboutComponent,
    ProfileComponent,
    MyLearningComponent,
    CartComponent,
    CourseListComponent,
    CourseDetailComponent,
    InstructorComponent,
    StudentListsComponent,
    AllCoursesComponent,
    EnrollComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,HttpClientModule
  ],
  exports: [
    AppRoutingModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }

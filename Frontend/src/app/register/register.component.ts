import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../Services/app.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 

  userInfo : {first_name: string,
    last_name: string,
  password: string,
  email: string} = {first_name: "",
  last_name: "",
    password: "",
    email: ""}



  reactiveForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private appservice: AppService){
    this.reactiveForm=this.formBuilder.group({
      firstName:new FormControl('',Validators.compose([Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z]+")])),
      lastName:new FormControl('',Validators.compose([Validators.required,Validators.pattern("[a-zA-Z][a-zA-Z]+")])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password:new FormControl('',Validators.compose([Validators.required,Validators.minLength(4)])),
      confirmPassword:new FormControl('',Validators.compose([Validators.required]))
  },{
    validators:this.mustMatch("password","confirmPassword")
  })
  }
  get f(){
    return this.reactiveForm.controls
  }
  mustMatch(password:any,confirmPassword:any){
    return (formGroup:FormGroup)=>{
      const passwordControl=formGroup.controls[password]
      const confirmPasswordControl=formGroup.controls[confirmPassword]
      if(confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']){
        return;
      }
      if(passwordControl.value!== confirmPasswordControl.value){
        confirmPasswordControl.setErrors({ mustMatch:true })
      }
      else{
        confirmPasswordControl.setErrors(null)
      }
    }
  }

  setFirstName(name:string){
    this.userInfo.first_name = name
  }
  setLastName(name:string){
    this.userInfo.last_name = name
  }
  setEmail(email:string){
    this.userInfo.email = email
  }
  setPassWord(password:string){
    this.userInfo.password = password
  }

  sendData(){
    this.appservice.signup(this.userInfo)
  }


}





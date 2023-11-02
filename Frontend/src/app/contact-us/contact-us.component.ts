import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  onSubmit(form:any){
  
  }

  contactForm:FormGroup;
  constructor(private formBuilder:FormBuilder){
    this.contactForm=this.formBuilder.group({
      name:new FormControl('',Validators.compose([Validators.required,Validators.pattern("/[A-Za-z ] + +$/")])),
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      message: new FormControl('', [Validators.required, Validators.minLength(15)])
    })}
 
  get f(){
    return this.contactForm.controls
  }
}


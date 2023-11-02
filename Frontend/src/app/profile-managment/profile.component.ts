import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  reactiveForm:FormGroup
  constructor(private formBuilder:FormBuilder, protected appService: AppService){
    this.reactiveForm=this.formBuilder.group({
      firstName:new FormControl('',Validators.compose([])),
      lastName:new FormControl('',Validators.compose([])),
  })


}
image: any;
userInfo: any = {};

setFirstName(val: string){
  this.userInfo.first_name = val;
}
setLastName(val: string){
  this.userInfo.last_name = val;
}

setPassword(val: string){
  this.userInfo.password = val;
}
setImage(event: any){
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.image = file;
  }
}

save() {
  this.appService.getAllusers()
  console.log(this.userInfo, this.image)
    this.appService.updateProfile(this.userInfo, this.image);
}
get f(){
  return this.reactiveForm.controls
}
success: string='';
displaySuccess(){
  this.success= 'Updated Successfully!';
  setTimeout(() => {
    this.success='';
  }, 3000);
}
}


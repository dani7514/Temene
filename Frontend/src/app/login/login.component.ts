import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AppService } from '../Services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginfo: { email: string; password: string } = { email: '', password: '' };

  setEmail(email: string) {
    this.loginfo.email = email;
  }
  setPassword(password: string) {
    this.loginfo.password = password;
  }

  reactiveForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private appservice: AppService
  ) {
    this.reactiveForm = this.formBuilder.group({
      email: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.email])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(4)])
      ),
    });
  }
  get f() {
    return this.reactiveForm.controls;
  }
  sendData() {
    this.appservice.login(this.loginfo);
  }
}

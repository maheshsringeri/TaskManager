import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup | any = null;

  constructor() { }

  ngOnInit(): void {
    this.signUpForm=new FormGroup({
      firstName:new FormControl(null),
      lastName:new FormControl(null),
      email:new FormControl(null),
      mobile:new FormControl(null),
      dateOfBirth:new FormControl(null)
    });

  }

}

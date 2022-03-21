import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginViewModel } from '../login-view-model';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginViewModel:LoginViewModel =new LoginViewModel();
  loginError: string = "";

  constructor(private loginService:LoginService,private router:Router,private jwtHelperService:JwtHelperService)
  {

  }

  @ViewChild("userName") userName:ElementRef|any=null;

  ngOnInit(): void {
    setTimeout(() => {
      this.userName.nativeElement.focus();
    }, 500);
  }

  onLoginClick(event:any)
  {
    this.loginService.Login(this.loginViewModel).subscribe({
      next:(response)=>{

        var token=sessionStorage.getItem('currentUser')? JSON.parse(sessionStorage.getItem('currentUser') as string):null;
        if(token.role=="Employee")
          this.router.navigateByUrl("tasks");
        else
          this.router.navigateByUrl("dashboard");
      },
      error:(error)=>{
        console.log(error);
        this.loginError = "Invalid Username or Password";
      }
    });
  }

}

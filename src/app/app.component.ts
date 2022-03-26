import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLoggerService } from './router-logger.service';
import { NavigationEnd, Router } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit
{

  constructor(public loginService:LoginService,private domSanitizer:DomSanitizer,
                private routerLoggerService:RouterLoggerService,private router:Router)
  {

  }

  ngOnInit(): void {
    this.router.events.subscribe((event)=>{
      if(event instanceof NavigationEnd)
      {
        let userName=(this.loginService.currentUserName)?this.loginService.currentUserName:"anonymous";

        let logMsg=new Date().toLocaleString()+":"+userName+ " Navigate to "+event.url;

        this.routerLoggerService.log(logMsg).subscribe();
      }

    });
    
    
  }
  
}

import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLoggerService } from './services/router-logger.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { fadeAnimation,keyFrameAnimation,slideLeftOrRightAnimation,slideUpAnimation, zoomLeftAnimation, zoomUpAnimation } from './my-animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[keyFrameAnimation]

  
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
  
  getState(outlet:RouterOutlet)
  {
    return outlet.isActivated ? 
      outlet.activatedRoute.snapshot.url[0].path && outlet.activatedRouteData["linkIndex"]  : "none";
  }

}

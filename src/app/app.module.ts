import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtIntercepterService } from './interceptors/jwt-intercepter.service';
import { JwtUnAuthorizedIntercepterService } from './interceptors/jwt-un-authorized-intercepter.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AlertDirective } from './directives/alert.directive';
import { RepeaterDirective } from './directives/repeater.directive';
import { EmployeeModule } from './employee/employee.module';
import{BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AlertDirective,
    RepeaterDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    EmployeeModule,
    SharedModule,
    JwtModule.forRoot({
      config:{
        tokenGetter:()=>{
          return (sessionStorage.getItem('currentUser')?JSON.parse(sessionStorage.getItem('currentUser') as string).token:null)
        }
      }
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtIntercepterService,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtUnAuthorizedIntercepterService,
      multi:true
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

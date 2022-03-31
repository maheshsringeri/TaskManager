import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { CanDeactiveGuardService } from './can-deactive-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent,data:{linkIndex:2} },
        {path:"signup",component:SignupComponent,canDeactivate:[CanDeactiveGuardService],data:{linkIndex:3}},
        {path:"about",component:AboutComponent,data:{linkIndex:1}}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

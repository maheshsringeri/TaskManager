import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { CanDeactiveGuardService } from './can-deactive-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent },
        {path:"signup",component:SignupComponent,canDeactivate:[CanDeactiveGuardService]},
        {path:"about",component:AboutComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,enableTracing:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

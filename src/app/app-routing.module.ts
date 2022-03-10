import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/about/about.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProjectsComponent } from './admin/projects/projects.component';
import { CanActivateGuardService } from './can-activate-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"",redirectTo:"login",pathMatch:"full"},
  {path:"login",component:LoginComponent },
  {path:"dashboard",component:DashboardComponent,canActivate:[CanActivateGuardService],
          data:{expectedRole:"Admin"}},
  {path:"about",component:AboutComponent},
  {path:"projects",component:ProjectsComponent,canActivate:[CanActivateGuardService],
          data:{expectedRole:"Admin"}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

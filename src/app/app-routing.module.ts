import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './admin/Components/about/about.component';
import { CanDeactiveGuardService } from './guards/can-deactive-guard.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
        {path:"",redirectTo:"login",pathMatch:"full"},
        {path:"login",component:LoginComponent,data:{linkIndex:2} },
        {path:"signup",component:SignupComponent,canDeactivate:[CanDeactiveGuardService],data:{linkIndex:3}},
        {path:"about",component:AboutComponent,data:{linkIndex:1}},
        {path:"admin", loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule) },
        {path:"employee",loadChildren:()=>import("./employee/employee.module").then(m=>m.EmployeeModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,enableTracing:true,preloadingStrategy:PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

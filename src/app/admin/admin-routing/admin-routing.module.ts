import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateGuardService } from 'src/app/guards/can-activate-guard.service';
import { DashboardComponent} from '../Components/dashboard/dashboard.component';
import { ProjectDetailsComponent } from '../Components/project-details/project-details.component'
import { ProjectsComponent } from '../Components/projects/projects.component';
import { MastersComponent } from '../Components/masters/masters.component';

const routes: Routes = [
    {path:"",canActivate:[CanActivateGuardService],data:{expectedRole:"Admin"},children:[
            {path:"dashboard",component:DashboardComponent,data:{linkIndex:0}},
            {path:"projects/:pageindex",component:ProjectsComponent,data:{linkIndex:2}},
            {path: "projects/view/:projectid/:pageindex", component: ProjectDetailsComponent,data:{linkIndex:3}},
            {path:"masters",component:MastersComponent,data:{linkIndex:4}}
    ]}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
  
})
export class AdminRoutingModule { 

}

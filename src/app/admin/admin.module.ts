import { NgModule } from '@angular/core';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { AboutComponent } from './Components/about/about.component';
import { MyProfileComponent } from './Components/my-profile/my-profile.component';
import { DashboardService } from '../services/dashboard.service';
import { ProjectsComponent } from './Components/projects/projects.component';
import { ProjectComponent } from './Components/project/project.component';
import { CheckBoxPrinterComponent } from './Components/check-box-printer/check-box-printer.component';
import { ProjectDetailsComponent } from './Components/project-details/project-details.component';
import { AdminRoutingModule } from './admin-routing/admin-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent
  ],
  imports: [AdminRoutingModule,SharedModule ],
  exports:[DashboardComponent,AboutComponent,MyProfileComponent,ProjectsComponent,
          ProjectDetailsComponent],
  providers:[DashboardService]

})
export class AdminModule { }

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
import { CountriesComponent } from './Components/countries/countries.component';
import { ClientLocationsComponent } from './Components/client-locations/client-locations.component';
import { TaskStatusComponent } from './Components/task-status/task-status.component';
import { TaskPrioritiesComponent } from './Components/task-priorities/task-priorities.component';
import { MastersComponent } from './Components/masters/masters.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    ProjectComponent,
    CheckBoxPrinterComponent,
    ProjectDetailsComponent,
    CountriesComponent,
    ClientLocationsComponent,
    TaskStatusComponent,
    TaskPrioritiesComponent,
    MastersComponent
  ],
  imports: [AdminRoutingModule,SharedModule ],
  exports:[DashboardComponent,AboutComponent,MyProfileComponent,ProjectsComponent,
          ProjectDetailsComponent],
  providers:[DashboardService],
  entryComponents:[CountriesComponent,ClientLocationsComponent,TaskPrioritiesComponent,TaskStatusComponent]

})
export class AdminModule { }

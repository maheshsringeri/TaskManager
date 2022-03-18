import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AboutComponent } from './about/about.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { DashboardService } from '../dashboard.service';
import { ProjectsComponent } from './projects/projects.component';
import { FormsModule } from '@angular/forms';
import { TeamSizeValidatorDirective } from '../team-size-validator.directive';
import { ClientLocationStatusValidatorDirective } from '../client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../project-idunique-validator.directive';
import { ProjectComponent } from './project/project.component';
import { CheckBoxPrinterComponent } from './check-box-printer/check-box-printer.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AboutComponent,
    MyProfileComponent,
    ProjectsComponent,
    TeamSizeValidatorDirective,
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    ProjectComponent,
    CheckBoxPrinterComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[DashboardComponent,AboutComponent,MyProfileComponent,ProjectsComponent,
            TeamSizeValidatorDirective,ClientLocationStatusValidatorDirective,ProjectIDUniqueValidatorDirective],
  providers:[DashboardService]

})
export class AdminModule { }

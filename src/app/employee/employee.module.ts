import { NgModule } from '@angular/core';
import { TasksComponent } from './Components/tasks/tasks.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TasksComponent
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  exports:[TasksComponent]

})
export class EmployeeModule { }

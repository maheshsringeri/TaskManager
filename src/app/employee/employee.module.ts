import { NgModule } from '@angular/core';
import { TasksComponent } from './Components/tasks/tasks.component';
import { EmployeeRoutingModule } from './employee-routing/employee-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CreateTaskComponent } from './Components/create-task/create-task.component';
import { EditTaskComponent } from './Components/edit-task/edit-task.component';
import { UpdateTaskStatusComponent } from './Components/update-task-status/update-task-status.component';



@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent,
  ],
  imports: [
    EmployeeRoutingModule,
    SharedModule
  ],
  exports:[
    TasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    UpdateTaskStatusComponent
  ]

})
export class EmployeeModule { }

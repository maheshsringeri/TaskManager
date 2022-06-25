import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskStatus } from '../models/task-status';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusesService {

  constructor(private httpClient:HttpClient )
   { 

   }

   getTaskStatus():Observable<TaskStatus[]>
   {
      return this.httpClient.get<TaskStatus[]>("api/taskstatus",{responseType:"json"});
   }

   getTaskStatusByTaskStatusID(TaskStatusID:number):Observable<TaskStatus>
   {
      return this.httpClient.get<TaskStatus>("api/taskstatus/searchbytaskstatusid/"+TaskStatusID,{responseType:"json"});
   }

   insertTaskStatus(newTaskStatus:TaskStatus):Observable<TaskStatus>
   {
      return this.httpClient.post<TaskStatus>("api/taskstatus",newTaskStatus,{responseType:"json"});
   }

   updateTaskStatus(existingTaskStatus:TaskStatus):Observable<TaskStatus>
   {
      return this.httpClient.put<TaskStatus>("api/taskstatus",existingTaskStatus,{responseType:"json"});
   }

   deleteTaskStatus(TaskStatusID:number):Observable<number>
   {
      return this.httpClient.delete<number>("api/taskstatus?TaskStatusID="+TaskStatusID,{responseType:"json"});
   }
}

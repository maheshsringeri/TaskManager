import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/project';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit,OnDestroy
{


  project:Project;
  routParamSubscription:Subscription|any=null;
  pageindex:number=0;

  constructor(private activatedRoute:ActivatedRoute, private projectsService:ProjectsService) 
  {
    this.project=new Project();
  }


  ngOnInit(): void {

   this.routParamSubscription= this.activatedRoute.params.subscribe((params)=>{
      let pid=params["projectid"];
      this.pageindex=params["pageindex"];

      this.projectsService.getProjectByProjectID(pid).subscribe((proj:Project)=>{
        this.project=proj;
      });

    });
  }

  ngOnDestroy(): void {
    this.routParamSubscription.unsubscribe();
  }

}

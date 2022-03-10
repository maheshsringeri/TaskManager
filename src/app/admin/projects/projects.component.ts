import { Component, OnInit } from '@angular/core';
import { ProjectsService } from 'src/app/projects.service';
import { Project } from 'src/app/project';
import { Subscriber } from 'rxjs';
import { ClientLocation } from 'src/app/client-location';
import { ClientLocationsService } from 'src/app/client-locations.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects:Project[]=[];
  clientLocations:ClientLocation[]=[];
  showLoading:boolean=true;

  newProject:Project=new Project();
  editProject:Project=new Project();
  editIndex:number=0;
  deleteProject:Project=new Project();
  deleteIndex:number=0;
  searchBy:string="ProjectName";
  searchText:string="";


  constructor(private projectsService:ProjectsService,private clientLocationsService:ClientLocationsService) 
  { 

  }
  ngOnInit(): void {
    this.projectsService.getAllProjects().subscribe({
      next:(response:Project[])=>{
        this.projects=response;
        this.showLoading=false;
      }
    });

    this.clientLocationsService.getClientLocations().subscribe({
      next:(response)=>{
        this.clientLocations=response;
      }
    });
  }

  onSaveClick()
  {
    this.newProject.clientLocation.clientLocationID=0;

    this.projectsService.insertProject(this.newProject).subscribe({
          next: (response)=>{
                var p:Project=new Project();
                p.projectID=response.projectID;
                p.projectName=response.projectName;
                p.dateOfStart=response.dateOfStart;
                p.teamSize=response.teamSize;
                p.active=response.active;
                p.status=response.status;
                p.clientLocationID=response.clientLocationID;
                p.clientLocation=response.clientLocation;
                this.projects.push(p);

                this.newProject.projectID=null;
                this.newProject.projectName=null;
                this.newProject.dateOfStart=null;
                this.newProject.teamSize=null;
                this.newProject.active=false;
                this.newProject.status=null;
                this.newProject.clientLocationID=null;
                
              },
          error: (error)=>{
              console.log(error);
            }
        }
      );
  }

  onEditClick(event:any,index:number)
  {
    this.editProject.projectID=this.projects[index].projectID;
    this.editProject.projectName=this.projects[index].projectName;
    this.editProject.dateOfStart=this.projects[index].dateOfStart.split("/").reverse().join("-"); //yyyy-MM-dd
    this.editProject.teamSize=this.projects[index].teamSize;
    this.editProject.active=this.projects[index].active;
    this.editProject.status=this.projects[index].status;
    this.editProject.clientLocationID=this.projects[index].clientLocationID;
    this.editProject.clientLocation=this.projects[index].clientLocation;

    this.editIndex=index;
  }

  onUpdateClick()
  {
     this.projectsService.updateProject(this.editProject).subscribe({
        next:(response)=>{
          var p:Project=new Project();
          p.projectID=response.projectID;
          p.projectName=response.projectName;
          p.dateOfStart=response.dateOfStart;
          p.teamSize=response.teamSize;
          p.active=response.active;
          p.status=response.status;
          p.clientLocationID=response.clientLocationID;
          p.clientLocation=response.clientLocation;

          this.projects[this.editIndex]=p;

          this.editProject.projectID=null;
          this.editProject.projectName=null;
          this.editProject.dateOfStart=null;
          this.editProject.teamSize=null;
          this.editProject.active=false;
          this.editProject.status=null;
          this.editProject.clientLocationID=null;
        },
        error:(error)=>{
          console.log(error);
        }

     });
  }

  onDeleteClick(event:any,index:number)
  {
      this.deleteIndex=index;
      this.deleteProject.projectID=this.projects[index].projectID;
      this.deleteProject.projectName=this.projects[index].projectName;
      this.deleteProject.dateOfStart=this.projects[index].dateOfStart;
      this.deleteProject.teamSize=this.projects[index].teamSize;
  }

  onDeleteConfirmClick()
  {
    this.projectsService.deleteProject(this.deleteProject.projectID).subscribe({
      next:(response)=>{
        this.projects.splice(this.deleteIndex,1)

        this.deleteProject.projectID=null;
        this.deleteProject.projectName=null;
        this.deleteProject.dateOfStart=null;
        this.deleteProject.teamSize=null;
      },
      error:(error)=>{
        console.log(error);
      }
    });

  }

  onSearchClick()
  {
    this.projectsService.searchProjects(this.searchBy,this.searchText).subscribe({
      next:(response:Project[])=>{
        this.projects=response;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

}

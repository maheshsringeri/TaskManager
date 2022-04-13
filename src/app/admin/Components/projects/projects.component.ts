import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ProjectsService } from 'src/app/services/projects.service';
import { Project } from 'src/app/models/project';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { ClientLocation } from 'src/app/models/client-location';
import { ClientLocationsService } from 'src/app/services/client-locations.service';
import { NgForm } from '@angular/forms';
import * as $ from "jquery";
import { ProjectComponent } from '../project/project.component';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { ActivatedRoute } from '@angular/router';
import { RouterLoggerService } from 'src/app/services/router-logger.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit,OnDestroy 
{

  projects:Project[]=[];
  clientLocations:Observable<ClientLocation[]>|any;
  showLoading:boolean=true;

  newProject:Project=new Project();
  editProject:Project=new Project();
  editIndex:number=0;
  deleteProject:Project=new Project();
  deleteIndex:number=0;
  searchBy:string="projectName";
  searchText:string="";

  currentPageIndex:number=0;
  pageSize:number=3;
  pages:any[]=[];
  routParamSubscription:Subscription|any =null;

  @ViewChild("newForm") newForm: NgForm | any = null;
  @ViewChild("editForm") editForm: NgForm | any = null;
  

  constructor(private projectsService:ProjectsService,private clientLocationsService:ClientLocationsService,
          private activatedRoute:ActivatedRoute) 
  { 

  }

  

  ngOnInit(): void {

    this.projectsService.getAllProjects().subscribe({
      next:(response:Project[])=>{
        this.projects=response;
        this.showLoading=false;
        this.calculateNoOfPages();

        this.routParamSubscription=this.activatedRoute.params.subscribe((param)=>{
                      this.currentPageIndex=param["pageindex"];
                    });
      }
    });

    this.clientLocations=this.clientLocationsService.getClientLocations();
    
  }

  ngOnDestroy(): void {
    this.routParamSubscription.unsubscribe();
  }

  onSaveClick()
  {
    if(this.newForm.valid)
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
                  
                  $("#newFormCancel").trigger("click");
                  this.calculateNoOfPages();
                },
            error: (error)=>{
                console.log(error);
              }
          }
        );
    }
  }

  @ViewChild("prjEName") prjEName:ElementRef|any=null;
  onEditClick(event:any,index:number)
  {
    this.editForm.resetForm();

    setTimeout(() => {
      this.editProject.projectID=this.projects[index].projectID;
      this.editProject.projectName=this.projects[index].projectName;
      this.editProject.dateOfStart = this.projects[index].dateOfStart.split("/").reverse().join("-"); //yyyy-MM-dd
      this.editProject.teamSize=this.projects[index].teamSize;
      this.editProject.active=this.projects[index].active;
      this.editProject.status=this.projects[index].status;
      this.editProject.clientLocationID=this.projects[index].clientLocationID;
      this.editProject.clientLocation=this.projects[index].clientLocation;

      this.editIndex=index;
      
      this.prjEName.nativeElement.focus();

    }, 500);
  }

  onUpdateClick()
  {
    if(this.editForm.valid)
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

              $("#editFormCancel").trigger("click");
            },
            error:(error)=>{
              console.log(error);
            }

        });
    }
  }

  onDeleteClick(event:any,index:number)
  {
      this.deleteIndex=index;
      this.deleteProject.projectID=this.projects[index].projectID;
      this.deleteProject.projectName=this.projects[index].projectName;
      this.deleteProject.dateOfStart=this.projects[index].dateOfStart;
      this.deleteProject.teamSize=this.projects[index].teamSize;

      this.calculateNoOfPages();
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
    // this.projectsService.searchProjects(this.searchBy,this.searchText).subscribe({
    //   next:(response:Project[])=>{
    //     this.projects=response;
    //   },
    //   error:(error)=>{
    //     console.log(error);
    //   }
    // });
  }

  onSearchTextKeyup(event:any)
  {
    this.calculateNoOfPages();
  }

  
  @ViewChild("prjID") prjID: ElementRef | any = null;
  onNewClick(event:any)
  {
    this.newForm.resetForm();
    setTimeout(() => {
      this.prjID.nativeElement.focus();
    }, 500);
  }

  onHideShowDetails(event:any)
  {
    this.projectsService.toggleDetails();
      
  }

  

  @ViewChildren("prj") prj : QueryList<ProjectComponent> | any = null;

  isAllChecked:boolean=false;
  isAllCheckedChange(event:any)
  {
    let prjs=this.prj.toArray();
    for(let i=0;i<prjs.length;i++)
    {
      prjs[i].isAllCheckedChange(this.isAllChecked);
    }
  }


  calculateNoOfPages()
  {
    let filterPipe=new FilterPipe();
    var resultProjects=filterPipe.transform(this.projects,this.searchBy,this.searchText);

    var noOfPages=Math.ceil(resultProjects.length/this.pageSize);

    this.pages=[];

    for(let i=0;i<noOfPages;i++)
    {
      this.pages.push({pageIndex:i});
    }

    this.currentPageIndex=0;

  }

  onPageIndexClicked(pageIndex:number)
  {
    this.currentPageIndex=pageIndex;
  }
  


}

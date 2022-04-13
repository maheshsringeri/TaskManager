import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { DashboardService } from '../../../services/dashboard.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  Designation:string='';
  Username:string='';
  NoOfTeamMembers:number=0;
  TotalCostOfAllProjects:number=0;
  PendingTasks:number=0;
  UpComingProjects:number=0;
  ProjectCost:number=0;
  CurrentExpenditure:number=0;
  AvailableFunds:number=0;
  SelectedYear:number=0;
  ToDay: Date=new Date();

  Clients:string[]=[];
  Projects:string[]=[];
  Years:number[]=[];
  TeamMembersSummary:any[]=[];
  TeamMembers:any[]=[];

  constructor(private dashboardService:DashboardService)
  {

  }

  ngOnInit(): void {
   this.Designation='Team Leader';
   this.Username='Mahesh SN';
   this.NoOfTeamMembers=10;
   this.TotalCostOfAllProjects=15050000;
   this.PendingTasks=50;
   this.UpComingProjects=15;
   this.ProjectCost=1000000;
   this.CurrentExpenditure=500000;
   this.AvailableFunds=50002.5000;
   this.ToDay=new Date();

   this.Clients=["ABC Infotech Ltd.","DEF Software Solutions","GHI Industries","Educo Soft"];
   this.Projects=["Project A","Project B","Project C","Project D","Project E"];

   for(var year=2019; year<=2025;year++)
   {
      this.Years.push(year);
   }

   this.TeamMembersSummary=this.dashboardService.getTeamMembersSummary();
   
   this.TeamMembers=this.dashboardService.getTeamMembers();
  }

  OnProjectChange($event:any){
    if($event.target.innerHTML=="Project A")
    {
      this.ProjectCost=150000;
      this.CurrentExpenditure=1000;
      this.AvailableFunds=100000;
    }
    else if($event.target.innerHTML=="Project B")
    {
      this.ProjectCost=250000;
      this.CurrentExpenditure=2000;
      this.AvailableFunds=200000;
    }
    else if($event.target.innerHTML=="Project C")
    {
      this.ProjectCost=350000;
      this.CurrentExpenditure=3000;
      this.AvailableFunds=300000;
    }
    else if($event.target.innerHTML=="Project D")
    {
      this.ProjectCost=450000;
      this.CurrentExpenditure=4000;
      this.AvailableFunds=400000;
    }
    else if($event.target.innerHTML=="Project E")
    {
      this.ProjectCost=550000;
      this.CurrentExpenditure=5000;
      this.AvailableFunds=500000;
    }
  }

  OnYearChange($event:any)
  {
    this.SelectedYear=$event.target.innerHTML;
  }
}

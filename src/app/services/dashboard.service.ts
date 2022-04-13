import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  getTeamMembersSummary():any[]
  {
    var TeamMembersSummary=[
      {Region:"East",Count:20,Members:4},
      {Region:"South",Count:15,Members:8},
      {Region:"West",Count:7,Members:1},
      {Region:"North",Count:15,Members:16}
     ];

     return TeamMembersSummary;
  }

  getTeamMembers():any[]
  {
   var TeamMembers=[
      {Region:"East",Members:[
           {Id:1,Name:"Ford",Status:"Available"},
           {Id:2,Name:"Miller Jhone",Status:"Available"},
           {Id:3,Name:"Jones",Status:"Busy"},
           {Id:4,Name:"James",Status:"Busy"}
         ]
       },
       {Region:"South",Members:[
           {Id:5,Name:"Ford",Status:"Available"},
           {Id:6,Name:"Miller",Status:"Available"},
           {Id:7,Name:"Jones",Status:"Busy"},
           {Id:8,Name:"James",Status:"Busy"}
         ]
       },
       {Region:"West",Members:[
           {Id:9,Name:"Jones",Status:"Available"},
           {Id:10,Name:"Miller",Status:"Busy"},
           {Id:11,Name:"Ford",Status:"Available"},
           {Id:12,Name:"Ford",Status:"Busy"}
         ]
       },
       {Region:"North",Members:[
         {Id:13,Name:"Jones",Status:"Available"},
         {Id:14,Name:"Miller",Status:"Busy"},
         {Id:15,Name:"Ford",Status:"Available"},
         {Id:16,Name:"James",Status:"Busy"}
       ]
     }
    ];

    return TeamMembers;
  }

}

import { Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  @Input("currentProject") project:Project|any=null;
  @Input("recordIndex") i:number=0;

  @Output() editClick = new EventEmitter();
  @Output() deleteClick = new EventEmitter();

  @ContentChildren("selectionBox") selectiobBoxes:QueryList<CheckBoxPrinterComponent>|any=null;
  
  MySubscription: Subscription|any;
  hideDetails:boolean=false;

  constructor(public projectsService:ProjectsService) 
  {

  }

  ngOnInit(): void {
    this.MySubscription=  this.projectsService.MySubject.subscribe((hide)=>{
                                  this.hideDetails=hide;
                                });
  }

  ngOnDestroy()
  {
    this.MySubscription.unsubscribe();
  }

  onEditClick(event: any, i: number)
  {
    this.editClick.emit({ event, i});
  }

  onDeleteClick(event: any, i: number)
  {
    this.deleteClick.emit({ event, i});
  }

  isAllCheckedChange(b:boolean)
  {
    let selectiobBox=this.selectiobBoxes.toArray();

    if(b)
    {
      for(let i=0;i<selectiobBox.length;i++)
      {
        selectiobBox[i].check();
      }
    }
    else
    {
      for(let i=0;i<selectiobBox.length;i++)
      {
        selectiobBox[i].unCheck();
      }
    }
  }

}

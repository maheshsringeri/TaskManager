import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, DoCheck, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/project';
import { ProjectsService } from 'src/app/projects.service';
import { CheckBoxPrinterComponent } from '../check-box-printer/check-box-printer.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnChanges,OnInit,DoCheck,
    AfterContentInit,AfterContentChecked,AfterViewInit,AfterViewChecked,OnDestroy
{

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

  ngOnChanges(simpleChanges:SimpleChanges): void {
    console.info("----------------ngOnChanges called");
    for(let propName in simpleChanges)
    {
      let chng=simpleChanges[propName];
      let cur=JSON.stringify(chng.currentValue);
      let prev=JSON.stringify(chng.previousValue);

      console.log(`${propName}:currentValue=${cur} ,previousValue=${prev}`);
    }

    if(simpleChanges["project"])
    {
      //this.project.teamSize+=1;
    }

  }

  ngOnInit(): void 
  {
    console.info("----------------ngOnInit called");
    this.MySubscription=  this.projectsService.MySubject.subscribe((hide)=>{
                                  this.hideDetails=hide;
                                });
  }

  ngDoCheck(): void {
    console.info("----------------ngDoCheck called");
  }

  ngAfterContentInit(): void {
    console.info("----------------ngAfterContentInit called");
    console.log(this.selectiobBoxes.toArray());
  }

  ngAfterContentChecked(): void {
    console.info("----------------ngAfterContentChecked called");
  }

  @ViewChild("tbl") tbl:ElementRef|any=null;
  ngAfterViewInit(): void {
    console.info("----------------ngAfterViewInit called");
    console.log(this.tbl);
  }

  ngAfterViewChecked(): void {
    console.info("----------------ngAfterViewChecked called");
  }

  ngOnDestroy()
  {
    console.info("----------------ngOnDestroy called");
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

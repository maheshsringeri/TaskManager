import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-priorities',
  templateUrl: './task-priorities.component.html',
  styleUrls: ['./task-priorities.component.scss']
})
export class TaskPrioritiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}

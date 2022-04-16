import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-locations',
  templateUrl: './client-locations.component.html',
  styleUrls: ['./client-locations.component.scss']
})
export class ClientLocationsComponent implements OnInit,OnDestroy
 {

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}

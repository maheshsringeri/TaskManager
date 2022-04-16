import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit,OnDestroy
{

  messege:string|any =null;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
  }
}

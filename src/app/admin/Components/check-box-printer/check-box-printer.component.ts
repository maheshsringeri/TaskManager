import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-box-printer',
  templateUrl: './check-box-printer.component.html',
  styleUrls: ['./check-box-printer.component.scss']
})
export class CheckBoxPrinterComponent implements OnInit {

  isChecked=false;
  constructor() { }

  ngOnInit(): void {
  }

  check()
  {
    debugger;
    this.isChecked=true;
  }

  unCheck()
  {
    debugger;
    this.isChecked=false;
  }

}

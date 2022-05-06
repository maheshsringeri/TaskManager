import { KeyValuePipe } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country';
import { FilterPipe } from 'src/app/pipes/filter.pipe';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit
{
   //Objects for Holding Model Data
  countries: Country[]=[];
  showLoading:boolean=false;

  //Objects for Delete
  deleteCountry: Country=new Country();
  editIndex:number|any =null;
  deleteIndex:number|any=null;

  //Properties for Searching
  searchBy:string="countryName";
  searchText:string="";

   //Properties for Paging
   currentPageIndex:number=0;
   pages:any[]=[];
   pageSize:number=7;

   //Reactive Forms
   newForm:FormGroup | any=null;
   editForm:FormGroup | any=null;

   //Autofocus TextBoxes
   @ViewChild("defaultTextBox_New") defaultTextBox_New:ElementRef|any=null;
   @ViewChild("defaultTextBox_Edit") defaultTextBox_Edit:ElementRef|any=null;


   sortBy:string="countryName";
   sortOrder:string="ASC";  //ASC|DESC
   
  

  constructor(private countriesService:CountriesService,private formBuilder:FormBuilder) 
  { 

  }

  ngOnInit(): void {
    this.showLoading=true;
    this.countriesService.getCountries().subscribe(
      (response:Country[])=>{
        this.countries=response;
        this.showLoading=false;
        this.calculateNoOfPages();
      });

      //Create newForm
    this.newForm = this.formBuilder.group({
      countryID: this.formBuilder.control(null),
      countryName: this.formBuilder.control(null, [Validators.required])
    });

    this.editForm=this.formBuilder.group({
      countryID:this.formBuilder.control(null),
      countryName:this.formBuilder.control(null,[Validators.required])
    });

  }

  

   //Get no. of Pages
  calculateNoOfPages() {
    let filterPipe=new FilterPipe();
    var noOfPages=Math.ceil(filterPipe.transform(this.countries,this.searchBy,this.searchText).length/this.pageSize);
    this.pages=[];

    //Generate pages
    for(let i=0;i<noOfPages;i++)
    {
      this.pages.push({pageIndex:i});
    }

    this.currentPageIndex=0;
  }

  onPageIndexClicked(ind:number)
  {
    if(ind>=0 && ind<this.pages.length){
      this.currentPageIndex=ind;
    }
  }

  onSearchTextChange(event:any)
  {
    //Recall the calculateNoOfPages
    this.calculateNoOfPages();
  }

  onNewClick(event:any)
  {
    //reset the newForm
    this.newForm.reset({countryID:null});

    setTimeout(() => {
      this.defaultTextBox_New.nativeElement.focus();
    }, 100);

  }

  onSaveClick()
  {
    if(this.newForm.valid)
    {
      this.countriesService.insertCountry(this.newForm.value).subscribe({
        next:(response)=>{
          //Add Response to Grid
          var p:Country=new Country();
          p.countryID=response.countryID;
          p.countryName=response.countryName;
          this.countries.push(p);

          //Reset the newForm
          this.newForm.reset();
          $("#newCountryFormCancel").trigger("click");
          this.calculateNoOfPages();
        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }

  onEditClick(event:any,country:Country)
  {
    //Reset the editForm
    this.editForm.reset();

    setTimeout(() => {
      this.editForm.patchValue(country);
      this.editIndex=this.countries.indexOf(country);

      //Focus the ClientLocation textbox in editForm
      this.defaultTextBox_Edit.nativeElement.focus();

    }, 100);

  }

  onUpdateClick()
  {
    if(this.editForm.valid)
    {
      this.countriesService.updateCountry(this.editForm.value).subscribe({
        next:(response:Country)=>{
          //Update the response in Grid
          this.countries[this.editIndex]=response;

          //Reset the editForm
          this.editForm.reset();
          $("#editCountryFormCancel").trigger("click");

        },
        error:(error)=>{
          console.log(error);
        }
      });
    }
  }

  onDeleteClick(event:any,country:Country)
  {
    this.deleteCountry.countryID=country.countryID;
    this.deleteCountry.countryName=country.countryName;
    this.deleteIndex=this.countries.indexOf(country);
  }

  onDeleteConfirmClick()
  {
    //Invoke the REST-API call
    this.countriesService.deleteCountry(this.deleteCountry.countryID).subscribe({
      next:(response)=>{
        this.countries.splice(this.deleteIndex,1);

        //Clear deleteCountry
        this.deleteCountry.countryID=null;
        this.deleteCountry.countryName=null;

        this.calculateNoOfPages();
      },
      error:(error)=>{
        console.log(error);
      }
    });

  }

}

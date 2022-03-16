import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CountriesService } from '../countries.service';
import { Country } from '../country';
import { CustomValidatorsService } from '../custom-validators.service';
import { LoginService } from '../login.service';
import { SignUpViewModel } from '../sign-up-view-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm:FormGroup | any = null;
  genders=["male","female"];
  countries:Country[]=[];
  registerError:string|null=null;

  constructor(private countriesService:CountriesService,private formBuilder:FormBuilder,
          private customValidatorsService:CustomValidatorsService,
          private loginService:LoginService,private router:Router) 
  {

  }

  ngOnInit(): void {

    this.countriesService.getCountries().subscribe((response)=>{
      this.countries=response;
    });

    this.signUpForm=this.formBuilder.group({
      personName:this.formBuilder.group({
        firstName:[null,[Validators.required,Validators.minLength(2)]],
        lastName:[null,[Validators.required,Validators.minLength(2)]]
      }),
      email: [null, [Validators.required, Validators.email], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur' }],
      mobile:[null,[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
      dateOfBirth:["2022-03-15",[Validators.required,this.customValidatorsService.minimumAgeValidator(18)]],
      password:[null,[Validators.required]],
      confirmPassword:[null,[Validators.required]],
      gender: [null,[Validators.required]],
      countryID:[null,[Validators.required]],
      receiveNewsLetters:null,
      skills:this.formBuilder.array([])
    },{
      validators:[
        this.customValidatorsService.compareValidator("confirmPassword","password")
      ]
    });



    this.signUpForm.valueChanges.subscribe((value:any)=>{
     // console.log(value);
    });
    
  }

  onSubmitClick()
  {
      //Display current form value
      (this.signUpForm as any)["submitted"]=true;
      console.log(this.signUpForm.value);

      if(this.signUpForm.valid)
      {
        var signUpViewModel =this.signUpForm.value as SignUpViewModel;
        this.loginService.Register(signUpViewModel).subscribe({
          next:(response)=>{
            this.router.navigate(["tasks"]);
          },
          error:(error)=>{
            console.log(error);
            this.registerError="Unable to submit";
          }
        });

      }
  }

  onAddSkill()
  {
    var formGroup=this.formBuilder.group({
      skillName:[null,[Validators.required]],
      sKillLevel:[null,[Validators.required]]
    });
    
    (<FormArray>this.signUpForm.get("skills")).push(formGroup);

  }

  onRemoveClick(index:number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }

}

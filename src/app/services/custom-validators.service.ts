import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CustomValidatorsService 
{

  constructor(private loginService:LoginService) 
  { 

  }

  public minimumAgeValidator(minAge:number):ValidatorFn
  {
    return (control:AbstractControl):ValidationErrors|null  =>{
        if(!control.value)
          return null;

        var today=new Date();
        var dateOfBirth=new Date(control.value);

        var diffMilliSecond=Math.abs(today.getTime()-dateOfBirth.getTime());
        var diffYears=(diffMilliSecond/(1000*60*60*24))/365.25;

        if(diffYears>=minAge)
          return null;
        else
          return {minAge:{valie:false}};
        
    };
  }

  public compareValidator(controlToValidate: string, controlToCompare: string): ValidatorFn
  {
    return (formGroup: AbstractControl): ValidationErrors | null =>
    {
      if (!(formGroup.get(controlToValidate) as FormControl).value)
        return null; //return, if the confirm password is null

      if ((formGroup.get(controlToValidate) as FormControl).value == (formGroup.get(controlToCompare) as any).value)
        return null; //valid
      else
      {
        (formGroup.get(controlToValidate) as FormControl).setErrors({ compareValidator: { valid: false } });
        return { compareValidator: { valid: false } }; //invalid
      }
    };
  }

  public DuplicateEmailValidator():AsyncValidatorFn
  {
    return (control:AbstractControl):Observable<ValidationErrors|null> =>{
      return this.loginService.getUserByEmail(control.value)
                      .pipe(map((existingUser:any)=>
                      {
                          if(existingUser!=null)
                          {
                            return {uniqueEmail:{valid:false}};
                          }
                          else
                          {
                            return null;
                          }

                      }));
    };
  }

}


import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Variation } from '@popperjs/core';

@Directive({
  selector: '[appClientLocationStatusValidator]',
  providers:[{provide:NG_VALIDATORS,useExisting:ClientLocationStatusValidatorDirective,multi:true}]
})
export class ClientLocationStatusValidatorDirective implements Validator
{

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    let isValid=true;

    if(control.value.ClientLocation == 6 && control.value.Status == "Support")
    {
      isValid=false;
    }
    
    if(isValid)
    {
      return null;
    }
    else{
      return {clientLocationStatus:{valid:false}};
    }

  }

}

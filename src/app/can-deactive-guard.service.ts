import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate
{
  canLeave:boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactiveGuardService implements CanDeactivate<CanComponentDeactivate> 
{
 
  canDeactivate(component: CanComponentDeactivate) {

    if(component.canLeave == true)
    {
      return true;
    }
    else
    {
      return confirm("Do you want to discard changes?");
    }
  }

}

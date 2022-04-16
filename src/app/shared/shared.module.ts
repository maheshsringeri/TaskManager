import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLocationStatusValidatorDirective } from '../directives/client-location-status-validator.directive';
import { ProjectIDUniqueValidatorDirective } from '../directives/project-idunique-validator.directive';
import { TeamSizeValidatorDirective } from '../directives/team-size-validator.directive';
import { FilterPipe } from '../pipes/filter.pipe';
import { NumberToWordsPipe } from '../pipes/number-to-words.pipe';
import { PagingPipe } from '../pipes/paging.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ComponentLoaderDirective } from '../directives/component-loader.directive';



@NgModule({
  declarations: [
    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    TeamSizeValidatorDirective,
    FilterPipe,
    NumberToWordsPipe,
    PagingPipe,
    ComponentLoaderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    ClientLocationStatusValidatorDirective,
    ProjectIDUniqueValidatorDirective,
    TeamSizeValidatorDirective,
    FilterPipe,
    NumberToWordsPipe,
    PagingPipe,
    ComponentLoaderDirective
  ]

})
export class SharedModule { }

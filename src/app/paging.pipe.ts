import { Pipe, PipeTransform } from '@angular/core';
import { Project } from './project';

@Pipe({
  name: 'paging'
})
export class PagingPipe implements PipeTransform {

 transform(value: Project[], currentPageIndex: number, pageSize: number): any
    {
    if (value == null)
    {
      return value;
    }
    
    var start:number=currentPageIndex * pageSize;
    var end:number=(Number(currentPageIndex) + 1) * pageSize;

    let resultArray = [];
    for (let i =start ; i < end ; i++)
    {
      if (value[i])
      {
        resultArray.push(value[i]);
      }
    }
    return resultArray;
  }

}

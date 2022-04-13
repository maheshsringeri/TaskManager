import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRepeater]'
})
export class RepeaterDirective implements OnInit
{

  @Input("appRepeater") n:number=0;

  constructor(private viewContainerRef:ViewContainerRef,private templateRef:TemplateRef<any>)
  {
    this.viewContainerRef.clear();
  }

  ngOnInit(): void {
    
    for(let i=0;i<this.n;i++)
    {
      this.viewContainerRef.createEmbeddedView(this.templateRef,{$implicit:i});
    }

  }

}

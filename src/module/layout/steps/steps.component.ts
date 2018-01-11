/**
 * Created by pratik on 15/12/17.
 */
import {Component, ContentChildren, EventEmitter, OnInit, Output, QueryList} from '@angular/core';
import {StepBlockComponent} from "./step-block";

@Component({
  selector: 'amexio-steps',
  template: `
    <ul class="wizard">
      <li class="wizard-list {{i==0?'selected' : ''}}" *ngFor="let data of stepData;let i = index" (click)="onBlockClick(data,$event)">
        {{data.label}}
      </li>
    </ul>
  `
})

export class AmexioStepsComponent implements OnInit {

  stepData : any[] = [];

  @ContentChildren(StepBlockComponent)  steps: QueryList<StepBlockComponent>;

  @Output() onBlockClickEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    let steps : any[] = this.steps.toArray();
    this.steps.forEach((step : any)=>{
      let data ={
        active : step.active,label : step.label,icon : step.icon
      };
      this.stepData.push(data);
    });
  }

  onBlockClick(data : any,event : any){
    this.onBlockClickEvent.emit(data);
  }
}

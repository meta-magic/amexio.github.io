/**
 * Created by pratik on 15/12/17.
 */

 /*
 Component Name : Amexio StepBox
 Component Selector : <amexio-steps>
 Component Description : Step-box component is an indicator for the steps in a workflow

*/
import {
  AfterContentInit, Component, ContentChildren, EventEmitter, Input,
  Output, QueryList
} from '@angular/core';
import {StepBlockComponent} from "./step-block";

@Component({
  selector: 'amexio-steps', template: `
    <div class="stepwizard" *ngIf="(index && !block && !icon)">
      <div class="stepwizard-row setup-panel">
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="stepwizard-step" >
          <button type="button" [disabled]="!stepBlock.active" [ngClass]="{'disabled index-step-inactive':!stepBlock.active,'active':stepBlock.active}"
                  class="btn-circle button button-primary" (click)="onStepClick(stepBlock,$event)"
                  >{{i + 1}}
          </button>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p>{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p><strong class="step-label-highlight">{{stepBlock.label}}</strong></p>
          </ng-container>
        </div>
      </div>
    </div>

    <!--this code use when user give icon true bydefault it is false-->
    <div class="stepwizard" *ngIf="(icon && !index && !block)">
      <div class="stepwizard-row setup-panel" >
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="stepwizard-step" >
 
          <ng-container *ngIf="stepBlock.icon && stepBlock.active">
          <span [ngClass]="{'step-box-icon-active':stepBlock.active}" (onClick)="onStepClick(stepBlock,$event)">
            <amexio-pane-icon [customclass]="stepBlock.icon" ></amexio-pane-icon>
          </span>
            </ng-container>
          <ng-container *ngIf="stepBlock.icon && !stepBlock.active">
          <span [ngClass]="{'step-block-icon-disable':!stepBlock.active}">
            <amexio-pane-icon [customclass]="stepBlock.icon" (onClick)="onStepClick(stepBlock,$event)"></amexio-pane-icon>
            </span>
          </ng-container>
          <ng-container *ngIf="stepBlock.icon=='' || !stepBlock.icon">
            <br>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p style="cursor:not-allowed;" (onClick)="onStepClick(stepBlock,$event)">{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p style="cursor:pointer;" ><strong class="step-label-highlight" [ngClass]="{'step-box-label-active':stepBlock.active}">{{stepBlock.label}}</strong></p>
          </ng-container>
        </div>
      </div>
    </div>

    <!--This code use for steps of boxes-->
    <div *ngIf="block">
      <div *ngIf="block" class="step-box-sqaure">
        <div class="step-box-table">
          <ng-container *ngFor="let stepBlock of stepBlockArray; let i = index">
            <div class="step-box-table-item" (click)="onStepClick(stepBlock,$event)"  style="padding-top: 10px;" [ngClass]="{'disabled step-box-table-item-hover ':!stepBlock.active,'active':stepBlock.active}">
              <a >
                <ng-container *ngIf="index">
                  {{i + 1}}<br>
                </ng-container>
                <ng-container *ngIf="icon && stepBlock.icon">
                <amexio-pane-icon [customclass]="stepBlock.icon"></amexio-pane-icon>
 
                </ng-container>
                <ng-container *ngIf="stepBlock.label && !stepBlock.active">
                  <p style="word-wrap: break-word;">{{stepBlock.label}}</p>
                </ng-container>
                <ng-container *ngIf="stepBlock.label && stepBlock.active">
                <p style="word-wrap: break-word;"><strong>{{stepBlock.label}}</strong></p>
                  
                </ng-container>
              </a>
            </div>
          </ng-container>

        </div>
      </div>

    </div>
  `
})

export class AmexioStepsComponent implements AfterContentInit {
  private componentLoaded: boolean;

   /*
Properties 
name : index
datatype : boolean
version : 4.0 onwards
default : false
description : Show the indexes of steps.
*/
  @Input() index: boolean;

    /*
Properties 
name : icon
datatype : boolean
version : 4.0 onwards
default : false
description : icon for stepbox.
*/
  @Input() icon: boolean;

     /*
Properties 
name :  block
datatype : boolean
version : 4.0 onwards
default : false
description : Show block based on boolean.
*/
  @Input() block: boolean;

  /*
Events
name : onClick
datatype : none
version : none
default : none
description :Event emitted on block click.
*/
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  /*
Events
name : getStepBlockData
datatype : none
version : none
default : none
description :Gives stepblock information .
*/
  @Output() getStepBlockData: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];

       /*
Properties 
name :  data
datatype : any
version : 4.0 onwards
default : 
description : Provides data for stepblock.
*/
_data: any;
@Input('data')
 set data(value: any[]) {
   this._data = value;
   if (this.componentLoaded) {
     this.updateComponent();
   }
 }
 get data(): any[] {
   return this._data;
 }


  stepPreviewData: any;


  constructor() {

  }

  onStepClick(data: any, ev: any) {
    this.getStepBlockData.emit({"event":ev,"data":data});
    this.onClick.emit(data);
  }

  ngAfterContentInit() {
    if (this.data && this.data.length > 0) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    } else {
      this.stepBlockArray = this.stepBlocks.toArray();
    }
    this.componentLoaded = true;
  }

  updateComponent() {
    if (JSON.stringify(this.stepPreviewData) != JSON.stringify(this.data)) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    }
  }
}

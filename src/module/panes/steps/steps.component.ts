/**
 * Created by pratik on 15/12/17.
 */
import {
  AfterContentInit, Component, ContentChildren, DoCheck, EventEmitter, Input,
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
  
            <amexio-pane-icon style="color: #666;" [customclass]="stepBlock.icon" (onClick)="onStepClick(stepBlock,$event)"></amexio-pane-icon>
          </ng-container>
          <ng-container *ngIf="stepBlock.icon=='' || !stepBlock.icon">
            <br>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p (onClick)="onStepClick(stepBlock,$event)">{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p><strong class="step-label-highlight" [ngClass]="{'step-box-label-active':stepBlock.active}">{{stepBlock.label}}</strong></p>
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

export class AmexioStepsComponent implements AfterContentInit, DoCheck {

  @Input() index: boolean;

  @Input() icon: boolean;

  @Input() block: boolean;

  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() getStepBlockData: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];

  @Input() data: any[];

  stepPreviewData: any;


  constructor() {

  }

  onStepClick(data: any, ev: any) {
    this.getStepBlockData.emit({"event":ev,"data":data});
    this.onClick.emit(data);
  }

  ngAfterContentInit() {
    debugger;
    if (this.data && this.data.length > 0) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
      console.log(this.stepBlockArray);
    } else {
      this.stepBlockArray = this.stepBlocks.toArray();
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.stepPreviewData) != JSON.stringify(this.data)) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
      console.log(this.stepBlockArray);
    }
  }
}

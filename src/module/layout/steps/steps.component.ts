/**
 * Created by pratik on 15/12/17.
 */
import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {StepBlockComponent} from "./step-block";

@Component({
  selector: 'amexio-steps',
  template: `
    <div class="amexio-stepwizard" *ngIf="(showIndex && !showBlockBox && !showIcon)">
      <div class="amexio-stepwizard-row setup-panel">
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="amexio-stepwizard-step">
          <button type="button" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}" class="btn-circle button button-primary"
                  (click)="onClick(stepBlock,$event)">{{i + 1}}
          </button>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p>{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p><strong class="amexio-step-label-highlight">{{stepBlock.label}}</strong></p>
          </ng-container>
        </div>
      </div>
    </div>

    <!--this code use when user give showIcon true bydefault it is false-->
    <div class="amexio-stepwizard" *ngIf="(showIcon && !showIndex && !showBlockBox)">
      <div class="amexio-stepwizard-row setup-panel">
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="amexio-stepwizard-step">
          <!--this is for material design-->
          <ng-container *ngIf="stepBlock.icon && stepBlock.mdbClass ">
            <i [attr.class]="'material-icons'" (click)="onClick(stepBlock,$event)">{{stepBlock.icon}}</i>
          </ng-container>
          <!--this is for fontawesome-->
          <ng-container *ngIf="stepBlock.icon && !stepBlock.mdbClass">
            <i [attr.class]="stepBlock.icon" (click)="onClick(stepBlock,$event)"></i>
          </ng-container>
          <ng-container *ngIf="stepBlock.icon=='' || !stepBlock.icon">
            <br>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p>{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p><strong class="amexio-step-label-highlight">11{{stepBlock.label}}</strong></p>
          </ng-container>
        </div>
      </div>
    </div>

    <!--This code use for steps of boxes-->
    <div *ngIf="showBlockBox">
      <div *ngIf="showBlockBox" class="step-box-sqaure">
        <div class="step-box-table">
          <ng-container *ngFor="let stepBlock of stepBlockArray; let i = index">
            <div class="step-box-table-item" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}">
              <a style="padding-top: 10px;"
                 (click)="onClick(stepBlock,$event)">
                <ng-container *ngIf="showIndex">
                  {{i + 1}}<br>
                </ng-container>
                <ng-container *ngIf="showIcon && stepBlock.icon && stepBlock.mdbClass ">
                  <i [attr.class]="'material-icons'" (click)="onClick(stepBlock,$event)">{{stepBlock.icon}}</i>
                </ng-container>

                <ng-container *ngIf="showIcon && stepBlock.icon && !stepBlock.mdbClass">
                  <i [attr.class]="stepBlock.icon" (click)="onClick(stepBlock,$event)"></i>
                </ng-container>
                <ng-container *ngIf="stepBlock.label && !stepBlock.active">
                  <p>{{stepBlock.label}}</p>
                </ng-container>
                <ng-container *ngIf="stepBlock.label && stepBlock.active">
                  <p><strong>{{stepBlock.label}}</strong></p>
                </ng-container>
              </a>
            </div>
          </ng-container>

        </div>
      </div>

    </div>
  `
})

export class AmexioStepsComponent implements OnInit {

  @Input() showIndex: boolean;

  @Input() showIcon: boolean;

  @Input() showBlockBox: boolean;

  @Output() onBlockClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onBlockClickEvent: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];

  @Input() stepBlockLocalData: any[];

  stepPreviewData: any;


  constructor() {

  }

  onClick(data: any, ev: any) {
    this.onBlockClick.emit(data);
    this.onBlockClickEvent.emit(ev);
  }

  ngAfterContentInit() {
    if (this.stepBlockLocalData && this.stepBlockLocalData.length > 0) {
      this.stepBlockArray = this.stepBlockLocalData;
    } else {
      this.stepBlockArray = this.stepBlocks.toArray();
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.stepPreviewData) != JSON.stringify(this.stepBlockLocalData)) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.stepBlockLocalData));
      this.stepBlockArray = this.stepBlockLocalData;
    }
  }
  ngOnInit() {
    if (this.stepBlockLocalData && this.stepBlockLocalData.length > 0 ) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.stepBlockLocalData));
      this.stepBlockArray = this.stepBlockLocalData;
    }

  }
}

/**
 * Created by pratik on 15/12/17.
 */
import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {StepBlockComponent} from "./step-block";

@Component({
  selector: 'amexio-steps',
  template: `
    <div class="stepwizard" *ngIf="(index && !block && !icon)">
      <div class="stepwizard-row setup-panel">
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="stepwizard-step">
          <button type="button" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}" class="btn-circle button button-primary"
                  (click)="onClick(stepBlock,$event)">{{i + 1}}
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
      <div class="stepwizard-row setup-panel">
        <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="stepwizard-step">
          <!--this is for material design-->
          <ng-container *ngIf="stepBlock.icon && stepBlock.mdb ">
            <i [attr.class]="'material-icons'" (click)="onClick(stepBlock,$event)">{{stepBlock.icon}}</i>
          </ng-container>
          <!--this is for fontawesome-->
          <ng-container *ngIf="stepBlock.icon && !stepBlock.mdb">
            <i [attr.class]="stepBlock.icon" (click)="onClick(stepBlock,$event)"></i>
          </ng-container>
          <ng-container *ngIf="stepBlock.icon=='' || !stepBlock.icon">
            <br>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && !stepBlock.active">
            <p>{{stepBlock.label}}</p>
          </ng-container>
          <ng-container *ngIf="stepBlock.label && stepBlock.active">
            <p><strong class="step-label-highlight">11{{stepBlock.label}}</strong></p>
          </ng-container>
        </div>
      </div>
    </div>

    <!--This code use for steps of boxes-->
    <div *ngIf="block">
      <div *ngIf="block" class="step-box-sqaure">
        <div class="step-box-table">
          <ng-container *ngFor="let stepBlock of stepBlockArray; let i = index">
            <div class="step-box-table-item" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}">
              <a style="padding-top: 10px;"
                 (click)="onClick(stepBlock,$event)">
                <ng-container *ngIf="index">
                  {{i + 1}}<br>
                </ng-container>
                <ng-container *ngIf="icon && stepBlock.icon && stepBlock.mdb ">
                  <i [attr.class]="'material-icons'" (click)="onClick(stepBlock,$event)">{{stepBlock.icon}}</i>
                </ng-container>

                <ng-container *ngIf="icon && stepBlock.icon && !stepBlock.mdb">
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

  @Input() index: boolean;

  @Input() icon: boolean;

  @Input() block: boolean;

  @Output() onBlockClick: EventEmitter<any> = new EventEmitter<any>();

  @Output() onBlockClickEvent: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];

  @Input() data: any[];

  stepPreviewData: any;


  constructor() {

  }

  onClick(data: any, ev: any) {
    this.onBlockClick.emit(data);
    this.onBlockClickEvent.emit(ev);
  }

  ngAfterContentInit() {
    if (this.data && this.data.length > 0) {
      this.stepBlockArray = this.data;
    } else {
      this.stepBlockArray = this.stepBlocks.toArray();
    }
  }

  ngDoCheck() {
    if (JSON.stringify(this.stepPreviewData) != JSON.stringify(this.data)) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    }
  }
  ngOnInit() {
    if (this.data && this.data.length > 0 ) {
      this.stepPreviewData = JSON.parse(JSON.stringify(this.data));
      this.stepBlockArray = this.data;
    }

  }
}

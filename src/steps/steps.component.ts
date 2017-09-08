/**
 * Created by sagar on 6/9/17.
 */
import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {StepBlockComponent} from "./step-block";

@Component({
  selector: 'amexio-steps', template: `
        <!--this code use when user give showIndex true bydefault it is true-->
        <div class="amexio-stepwizard" *ngIf="(showIndex && !showBlockBox && !showIcon)">
            <div class="amexio-stepwizard-row setup-panel">
                <div *ngFor="let stepBlock of stepBlockArray; let i = index" class="amexio-stepwizard-step">
                    <button type="button" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}" class="btn btn-info btn-circle"
                            (click)="onClick(stepBlock)">{{i + 1}}
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
                        <i [attr.class]="'material-icons'" (click)="onClick(stepBlock)">{{stepBlock.icon}}</i>
                    </ng-container>

                    <!--this is for fontawesome-->
                    <ng-container *ngIf="stepBlock.icon && !stepBlock.mdbClass">
                        <i [attr.class]="stepBlock.icon" (click)="onClick(stepBlock)"></i>
                    </ng-container>

                    <ng-container *ngIf="stepBlock.icon=='' || !stepBlock.icon">
                        <br>
                    </ng-container>
                    <ng-container *ngIf="stepBlock.label && !stepBlock.active">
                        <p>{{stepBlock.label}}</p>
                    </ng-container>

                    <ng-container *ngIf="stepBlock.label && stepBlock.active">
                        <p><strong class="amexio-step-label-highlight">{{stepBlock.label}}</strong></p>
                    </ng-container>

                </div>
            </div>
        </div>

        <!--This code use for steps of boxes-->
        <ul *ngIf="showBlockBox" class="nav nav-pills nav-justified ">
            <li *ngFor="let stepBlock of stepBlockArray; let i = index" class="nav-item " style="padding-right:2px;">
                <a class="nav-link amexio-step-box" [ngClass]="{'disabled':!stepBlock.active,'active':stepBlock.active}"
                   (click)="onClick(stepBlock)">
                    <ng-container *ngIf="showIndex">
                        {{i + 1}}<br>
                    </ng-container>

                    <ng-container *ngIf="showIcon && stepBlock.icon && stepBlock.mdbClass ">
                        <i [attr.class]="'material-icons'" (click)="onClick(stepBlock)">{{stepBlock.icon}}</i>
                    </ng-container>
                    <!--this is for fontawesome-->
                    <ng-container *ngIf="showIcon && stepBlock.icon && !stepBlock.mdbClass">
                        <i [attr.class]="stepBlock.icon" (click)="onClick(stepBlock)"></i>
                    </ng-container>

                    <ng-container *ngIf="stepBlock.label && !stepBlock.active">
                        <p>{{stepBlock.label}}</p>
                    </ng-container>

                    <ng-container *ngIf="stepBlock.label && stepBlock.active">
                        <p><strong>{{stepBlock.label}}</strong></p>
                    </ng-container>
                </a>
            </li>
        </ul>
  `,
  styles: [`

      .nav-pills {
          background-color: #d6d6d6;
      }

      .amexio-step-box {
          height: 80px;
          border:1px solid grey;
      }

      .amexio-step-label-highlight {
          color: black;
          font-weight: bold;
      }

      .amexio-stepwizard-step p {
          margin-top: 0px;
          color: #666;
      }

      .amexio-stepwizard-row {
          display: table-row;
      }

      .amexio-stepwizard {
          display: table;
          width: 100%;
          position: relative;
      }

      .amexio-stepwizard .btn.disabled, .amexio-stepwizard .btn[disabled], .amexio-stepwizard fieldset[disabled] .btn {
          opacity: 1 !important;
          color: #cccccc;
      }

      .amexio-stepwizard-row:before {
          top: 14px;
          bottom: 0;
          position: absolute;
          content: " ";
          width: 100%;
          height: 1px;
          background-color: #ccc;
          z-index: 0;
      }

      .amexio-stepwizard-step {
          display: table-cell;
          text-align: center;
          position: relative;
      }

      .btn-circle {
          width: 30px;
          height: 30px;
          text-align: center;
          padding: 6px 0;
          font-size: 12px;
          line-height: 1.428571429;
          border-radius: 15px;
      }
  `]
})

export class StepsComponent implements OnInit {

  @Input() showIndex: boolean;

  @Input() showIcon: boolean;

  @Input() showBlockBox: boolean;

  @Output() onBlockClick: EventEmitter<any> = new EventEmitter<any>();

  @ContentChildren(StepBlockComponent) stepBlocks: QueryList<StepBlockComponent>;

  stepBlockArray: StepBlockComponent[];


  constructor() {

  }

  onClick(event: any) {
    this.onBlockClick.emit(event);
  }

  ngAfterContentInit() {
    this.stepBlockArray = this.stepBlocks.toArray();
  }

  ngOnInit() {

  }
}

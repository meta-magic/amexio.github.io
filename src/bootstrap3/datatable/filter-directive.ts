import {ng2WalkerFactoryUtils} from "codelyzer/angular/ng2WalkerFactoryUtils";
/**
 * Created by dattaram on 27/6/17.
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DataTableService} from "./datatable.service";

declare var $;
@Component({
  selector: 'filter-component',
  template:`
    <div class="row">
      <div class="col-md-6 col-xs-12">
        <ng-container *ngIf="column.dataType==='string'">
          <div class="input-group">
            <input  [attr.id]="column.text"  type="text" class="form-control" [(ngModel)]="filterValue" [attr.placeholder]="column.text" aria-describedby="basic-addon1">
          </div>
        </ng-container>
        <ng-container *ngIf="column.dataType==='number'">
          <div class="input-group" >
            <input [attr.id]="column.text"  type="number" class="form-control" [(ngModel)]="filterValue" [attr.placeholder]="column.text" aria-describedby="basic-addon1">
          </div>
        </ng-container>
      </div>
      <div class="col-md-2 col-xs-6 ">
          <div class="btn-group">
            <button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
              <span class="glyphicon glyphicon-filter" aria-hidden="true"></span>
            </button>
            <ul class="dropdown-menu">
              <li *ngFor="let opt of filterOptions"><a (click)="selectedOption(column,opt)">{{opt.key}}</a></li>
            </ul>
          </div>
        </div>
      <div class="col-md-2 col-xs-6">
        <button *ngIf="column.filterIcon" type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" (click)="removeFilter(column)" >
          <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
        </button>
      </div>
    
      
      
    </div>
    
 
  
  `
})
export class FilterComponent implements OnInit {
  @Input() column: any;

  @Output() filterObject: any = new EventEmitter<any>();

  filterValue :any;

  ilteredObject : any[];



  filterOptions : any;
  constructor(private dataTableService : DataTableService) {

    this.filterOptions=[
      {
        "key":"Is Equal To",
        "value":"=="
      },
      {
        "key":"Is Not Equal To",
        "value":"!="
      }
    ]

  }

  ngOnInit() {
  }

  selectedOption(col : any,opt: any){
    if(this.filterValue){
      let filter : any = {};
      col.filterIcon = true;
      filter['key']=col.dataIndex;
      filter['value']=this.filterValue;
      filter['filter']=opt.value;
      this.dataTableService.filteredObject.forEach((option,index)=>{
        if(option.key==col.dataIndex){
          this.dataTableService.filteredObject.splice(index,1);
        }
      });
      this.dataTableService.filteredObject.push(filter);
      this.filterObject.emit(this.dataTableService.filteredObject);
    }


  }

  removeFilter(column : any){
    column.filterIcon=false;
    $('#'+column.text).val("");
    this.dataTableService.filteredObject.forEach((option,index)=>{
      if(option.key==column.dataIndex){
        this.dataTableService.filteredObject.splice(index,1);
      }
    });
    this.filterObject.emit(this.dataTableService.filteredObject);

  }
}

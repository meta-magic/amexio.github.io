/*
 * Copyright 2016-2017 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Author -  Dattaram Gawas
 *
 */

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonHttpService} from "../common.http.service";

declare var $;
@Component({
    selector: 'amexio-filter-component',
    template: `
        <div class="col-lg-12 col-xs-12">
            <div class="row">
                <ng-container *ngIf="column.dataType==='string'">
                  <div class="input-group input-group-sm">
                    <input [attr.id]="column.dataIndex" [(ngModel)]="filterValue" [attr.placeholder]="column.text" (keyup)="keyUpSearch(column)" type="text" class="form-control" aria-label="Text input with dropdown button">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-filter" aria-hidden="true"></i>
                      </button>
                      <div class="dropdown-menu ">

                        <ng-container *ngFor="let opt of filterOptions">
                          <ng-container *ngIf="opt.type===column.dataType">
                            <a class="dropdown-item" (click)="selectedOption(column,opt)" >{{opt.key}}&nbsp;<i [class]="opt.checkedStatus" aria-hidden="true"></i></a>
                          </ng-container>
                        </ng-container>
                      </div>
                    </div>
                    <span class="input-group-btn">
                      <button *ngIf="column.filterIcon" class="btn btn-secondary" type="button" (click)="removeFilter(column)"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </span>
                  </div>
                </ng-container>
                <ng-container *ngIf="column.dataType==='number'">
                  <div class="input-group input-group-sm">
                    <input [attr.id]="column.dataIndex" [(ngModel)]="filterValue" [attr.placeholder]="column.text" (keyup)="keyUpSearch(column)" type="number" class="form-control" aria-label="Text input with dropdown button">
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fa fa-filter" aria-hidden="true"></i>
                      </button>
                      <div class="dropdown-menu ">
                        <ng-container *ngFor="let opt of filterOptions">
                          <ng-container *ngIf="opt.type===column.dataType">
                            <a class="dropdown-item" (click)="selectedOption(column,opt)" >{{opt.key}}&nbsp;<i [class]="opt.checkedStatus" aria-hidden="true"></i></a>
                          </ng-container>
                        </ng-container>
                      </div>
                    </div>
                    <span class="input-group-btn">
                      <button *ngIf="column.filterIcon" class="btn btn-secondary" type="button" (click)="removeFilter(column)"><i class="fa fa-times" aria-hidden="true"></i></button>
                    </span>
                  </div>
                </ng-container>
            </div>
        </div>
    `
})
export class FilterComponent implements OnInit {
    @Input() column: any;

    @Output() filterObject: any = new EventEmitter<any>();

    filterValue: any;

    filterOptions: any;

    elementId: any;

    constructor(private dataTableService: CommonHttpService) {

        this.filterOptions = [
          {
            'key': 'Is Equal To',
            'value': '==',
            'type': 'string',
            'checkedStatus': ''
          },
          {
            'key': 'Is Not Equal To',
            'value': '!=',
            'type': 'string',
            'checkedStatus': ''
          },
          {
            'key': 'Start With',
            'value': '1',
            'type': 'string',
            'checkedStatus': 'fa fa-check'
          },

          {
            'key': 'Ends With',
            'value': '2',
            'type': 'string',
            'checkedStatus': ''
          },
          {
            'key': 'Contains',
            'value': '3',
            'type': 'string',
            'checkedStatus': ''
          },
          {
            'key': 'Is Equal To',
            'value': '==',
            'type': 'number',
            'checkedStatus': ''
          },
          {
            'key': 'Is Not Equal To',
            'value': '!=',
            'type': 'number',
            'checkedStatus': ''
          },
            {
                'key': 'Is greater Than',
                'value': '<',
                'type': 'number',
                'checkedStatus': ''
            },
            {
                'key': 'Is less Than',
                'value': '>',
                'type': 'number',
                'checkedStatus': ''
            },

            {
                'key': 'Is less Than or equal to',
                'value': '>=',
                'type': 'number',
                'checkedStatus': ''
            },
            {
                'key': 'Is greater Than or equal to',
                'value': '=<',
                'type': 'number',
                'checkedStatus': 'fa fa-check'
            }
        ];
    }

    ngOnInit() {
    }

    selectedOption(col: any, opt: any) {
        this.checkStatus();
        if (this.filterValue) {
            const filter: any = {};
            opt.checkedStatus = 'fa fa-check';
            col.filterIcon = true;
            filter['key'] = col.dataIndex;
            filter['value'] = this.filterValue;
            filter['filter'] = opt.value;
            filter['type'] = col.dataType;
            this.dataTableService.filteredObject.forEach((option, index) => {
                if (option.key === col.dataIndex) {
                    this.dataTableService.filteredObject.splice(index, 1);
                }
            });
            this.dataTableService.filteredObject.push(filter);
            this.filterObject.emit(this.dataTableService.filteredObject);
        }
    }

    keyUpSearch(col: any) {
        if (this.filterValue == null || this.filterValue === '') {
            this.removeFilter(col);
            this.removeCheckStatus(col);
        }else {
            col.filterIcon = true;
            const filter: any = {};
            filter['key'] = col.dataIndex;
            filter['value'] = this.filterValue;
            if (col.dataType === 'string') {
              filter['filter'] = 1;
            } else {
              filter['filter'] = '=<';
            }
            filter['type'] = col.dataType;
            this.dataTableService.filteredObject.forEach((option, index) => {
                if (option.key === col.dataIndex) {
                    this.dataTableService.filteredObject.splice(index, 1);
                }
            });
            this.dataTableService.filteredObject.push(filter);
            this.filterObject.emit(this.dataTableService.filteredObject);
        }

    }

    removeFilter(column: any) {
        this.removeCheckStatus(column);
        column.filterIcon = false;
        $('#' + column.dataIndex).val('');
        this.dataTableService.filteredObject.forEach((option, index) => {
            if (option.key === column.dataIndex) {
                this.dataTableService.filteredObject.splice(index, 1);
            }
        });
        this.filterObject.emit(this.dataTableService.filteredObject);
    }

    removeCheckStatus(col: any) {
        this.filterOptions.forEach((opt) => {
            if (col.dataType === 'string') {
                if (opt.value === 1) {
                    opt.checkedStatus = 'fa fa-check';
                }else {
                    opt.checkedStatus = '';
                }
            }else {
                if (opt.value === '=<') {
                    opt.checkedStatus = 'fa fa-check';
                }else {
                    opt.checkedStatus = '';
                }
            }
        });
    }
    checkStatus() {
        this.filterOptions.forEach((opt) => {
            opt.checkedStatus = '';
        });
    }
}

/**
 * Created by ketangote on 12/1/17.
 */

/*
Component Name : Amexio horizontal tree
Component Selector : <amexio-horizontal-treeview>
Component Description : A Horizontal Tree Component.
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-horizontal-treeview', template: `

    <div class="horizontaltreeview">
      <span tabindex="1" class="horizontaltreeview-node-label">{{label}}</span>
      <div style="height: 300px;" *ngIf="mask">
        <div class="spinner"></div>
      </div>
      <amexio-horizontal-treeviewnode *ngIf="!mask" [data]="data" (onNodeClick)="nodeclick($event)"></amexio-horizontal-treeviewnode>
    </div>
  `,
})
export class HorizontalTreeViewComponent implements OnInit {

  /*
Properties
name : label
datatype : string
version : 4.0 onwards
default : none
description : label for tree
*/
  @Input() label: string;

  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default : none
description : Local Data binding.
*/
  @Input() data: any[];

  /*
Properties
name : http-url
datatype : string
version : 4.0 onwards
default : none
description : REST url for fetching data.
*/
  @Input('http-url') httpurl: string;

  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default : none
description : Type of HTTP call, POST,GET etc.
*/
  @Input('http-method') httpmethod: string;

  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default : none
description : Key in JSON Datasource for records.
*/
  @Input('data-reader') datareader: string;

  /*
Events
name : nodeClick
datatype : none
version : none
default : none
description : It will gives you clicked node data.
*/
  @Output() nodeClick: any = new EventEmitter<any>();

  responseData: any;

  mask = true;

  constructor(public dataService: CommonDataService) {

  }

  ngOnInit() {
    if (this.httpmethod && this.httpurl) {
      this.dataService.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.setData(this.responseData);
      });
    }
  }

  setData(httpResponse: any) {
    // Check if key is added?
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      for (const ir of dr) {
        responsedata = responsedata[ir];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.mask = false;
    this.generateIndex(this.data, 1, Math.floor(Math.random() * 1000 + 999 + 1));
  }

  nodeclick(node: any) {
    this.nodeClick.emit(node);
  }

  generateIndex(data: any, parentId: number, rannumber: any) {
    data.forEach((element: any, index: number) => {
      element['id'] = '' + rannumber + '-' + parentId + (index + 1);
      if (element['children']) {
        this.generateIndex(element['children'], element.id.split('-')[1], rannumber);
      }
    });
  }
}

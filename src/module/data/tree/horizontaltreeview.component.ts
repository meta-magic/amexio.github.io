/**
 * Created by ketangote on 12/1/17.
 */

 /*
 Component Name : Amexio horizontal tree
 Component Selector : <amexio-horizontal-treeview>
 Component Description : A Horizontal Tree Component.
*/
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-horizontal-treeview', template: `

    <div class="horizontaltreeview">
      <span class="horizontaltreeview-node-label">{{label}}</span>
      <div style="height: 300px;" *ngIf="mask">
        <div class="spinner"></div>
      </div>
      <amexio-horizontal-treeviewnode *ngIf="!mask" [data]="data" (onNodeClick)="nodeclick($event)"></amexio-horizontal-treeviewnode>
    </div>
  `,
})
export class HorizontalTreeViewComponent {

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

  mask: boolean = true;

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
      let dr = this.datareader.split('.');
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    } else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
    this.mask = false;
  }

  nodeclick(node: any) {
    this.nodeClick.emit(node);
  }

}

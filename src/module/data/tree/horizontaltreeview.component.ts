/**
 * Created by ketangote on 12/1/17.
 */
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-horizontal-treeview',
  template: `

    <div class="horizontaltreeview" >
      <span class="horizontaltreeview-node-label">{{label}}</span>
      <amexio-horizontal-treeviewnode [data]="data" (onNodeClick)="nodeclick($event)"></amexio-horizontal-treeviewnode>
    </div>
  `
})
export class HorizontalTreeViewComponent {

  @Input() label : string;

  @Input() data : any[];

  @Input()
  httpUrl: string;

  @Input()
  httpMethod: string;

  @Input()
  dataReader: string;

  @Output()
  nodeClick: any = new EventEmitter<any>();

  responseData : any;

  constructor(public dataService : CommonDataService){

  }

  ngOnInit(){
    if (this.httpMethod && this.httpUrl) {
      this.dataService.fetchData(this.httpUrl,this.httpMethod).subscribe(
        response=>{
          this.responseData = response.json();
        },
        error=>{
        },
        ()=>{
          this.setData(this.responseData);
        }
      );
    }
  }

  setData(httpResponse : any) {
    //Check if key is added?
    let responsedata = httpResponse;
    if (this.dataReader != null) {
      let dr = this.dataReader.split(".");
      for (let ir = 0; ir < dr.length; ir++) {
        responsedata = responsedata[dr[ir]];
      }
    }
    else {
      responsedata = httpResponse;
    }
    this.data = responsedata;
  }

  nodeclick(node : any){
    this.nodeClick.emit(node);
  }

}

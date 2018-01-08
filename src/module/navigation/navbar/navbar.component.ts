/**
 * Created by ketangote on 12/8/17.
 */
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";
import {DeviceQueryService} from "../../services/device/device.query.service";

@Component({
  selector: 'amexio-nav',
  templateUrl : 'navbar.component.html',
  styleUrls : ['navbar.component.scss']
})
export class AmexioMenuBarComponent implements  OnInit{


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

  expand : boolean;

  constructor(public matchMediaService: DeviceQueryService,public dataService : CommonDataService){
    this.expand = false;
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


  onClick(node:any){
    if(this.matchMediaService.IsPhone() || this.matchMediaService.IsTablet()){
      for(let i=0; i<this.data.length; i++){
        if(this.data[i] === node){
          this.data[i].expand=!this.data[i].expand;
        }else{
          this.data[i].expand=false;
        }
      }
    }
    this.nodeClick.emit(node);

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
    this.data = httpResponse;
  }

}


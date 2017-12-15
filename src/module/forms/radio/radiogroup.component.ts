/**
 * Created by pratik on 27/11/17.
 */

import {Component, Input} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-radio-group',
  templateUrl : './radiogroup.component.html',
  styleUrls : ['./radiogroup.component.scss']
})
export class AmexioRadioGroupComponent {

  @Input()    allowBlank : boolean;

  @Input()    dataReader : string;

  @Input()    httpMethod : string;

  @Input()    httpUrl : string;

  @Input()    displayField : string;

  @Input()    valueField : string;

  @Input()    horizontal: boolean;

  @Input()    data : any;

  viewData : any;

  responseData : any;

  constructor(public amxHttp : CommonDataService){
  }

  ngOnInit() {
    if(this.httpMethod && this.httpUrl){
      this.amxHttp.fetchData(this.httpUrl,this.httpMethod).subscribe(
        response=>{
          this.responseData = response.json();
        },
        error=>{
        },
        ()=>{
          this.viewData = this.getResponseData(this.responseData);
        }
      );
    }else if (this.data != null){
      this.viewData = this.data;
    }
  }

  getResponseData(httpResponse : any){
    let responsedata = httpResponse;
    if(this.dataReader != null){
      let dr = this.dataReader.split(".");
      if(dr!=null){
        for(let ir = 0 ; ir<dr.length; ir++){
          responsedata = responsedata[dr[ir]];
        }
      }
    }
    else{
      responsedata = httpResponse;
    }

    return responsedata;
  }

  onClick(row : any){
    for (let r = 0 ; r < this.data.length; r++){
      if(this.data[r] == row){
        this.data[r]['selected']=true;
      }else{
        this.data[r]['selected']=false;
      }
    }
  }


}

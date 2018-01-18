/**
 * Created by pratik on 27/11/17.
 * Update Ketan Gote on 11/2/2018 - Field Label and Data Rendering changes.
 */

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-radio-group',
  templateUrl : './radiogroup.component.html',
  styleUrls : ['./radiogroup.component.scss']
})
export class AmexioRadioGroupComponent {

  @Input()    allowblank : boolean;

  @Input()    name : boolean;

  @Input()    fieldlabel : string;

  @Input()    datareader : string;

  @Input()    httpmethod : string;

  @Input()    httpurl : string;

  @Input()    displayfield : string;

  @Input()    valuefield : string;

  @Input()    horizontal: boolean;

  @Input()    data : any;

  @Output() onSelection : any = new EventEmitter<any>();

  viewData : any;

  responseData : any;

  constructor(public amxHttp : CommonDataService){
  }

  ngOnInit() {
    if(this.httpmethod && this.httpurl){
      this.amxHttp.fetchData(this.httpurl,this.httpmethod).subscribe(
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
      this.viewData = this.getResponseData(this.data);
    }
  }

  getResponseData(httpResponse : any){
    let responsedata = httpResponse;
    if(this.datareader != null){
      let dr = this.datareader.split(".");
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
    for (let r = 0 ; r < this.viewData.length; r++){
      if(this.viewData[r] == row){
        this.viewData[r]['selected']=true;
      }else{
        this.viewData[r]['selected']=false;
      }
    }
    this.onSelection.emit(row);
  }


}

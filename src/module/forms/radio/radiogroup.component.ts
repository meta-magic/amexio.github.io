/**
 * Created by pratik on 27/11/17.
 * Update Ketan Gote on 11/2/2018 - Field Label and Data Rendering changes.
 */
/*
 Component Name : Amexio Radiogroup
 Component Selector :  <amexio-radio-group>
 Component Description : Number input component has been created with different configurable attributes for validation (min/max value, allow blank, custom regex), custom error message, help, custom styles
*/
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonDataService} from "../../services/data/common.data.service";

@Component({
  selector: 'amexio-radio-group', templateUrl: './radiogroup.component.html', styleUrls: ['./radiogroup.component.scss']
})
export class AmexioRadioGroupComponent {
  /*
Properties 
name : allow-blank
datatype : string
version : 4.0 onwards
default : none 
description : Sets if field is required
*/
  @Input('allow-blank') allowblank: boolean = true;
  /*
Properties 
name :name
datatype : boolean
version : 4.0 onwards
default : none 
description : 
*/
  @Input() name: boolean;

   /*
Properties 
name : field-label
datatype : string
version : 4.0 onwards
default : none 
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
   /*
Properties 
name : data-reader
datatype : string
version : 4.0 onwards
default : none 
description : 	Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;
   /*
Properties 
name : http-method
datatype : string
version : 4.0 onwards
default : none 
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;
   /*
Properties 
name : http-url
datatype : string
version : 4.0 onwards
default : none 
description : 	REST url for fetching datasource.
*/
  @Input('http-url') httpurl: string;
   /*
Properties 
name : display-field
datatype : string
version : 4.0 onwards
default : none 
description : Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: string;
   /*
Properties 
name : value-field
datatype : string
version : 4.0 onwards
default : none 
description : Name of key inside response data.use to send to backend
*/
  @Input('value-field') valuefield: string;
   /*
Properties 
name : default-value
datatype : string
version : 4.0 onwards
default : none 
description : Default Value to be checked
*/
  @Input('default-value') defaultSelectedValue: string;
   /*
Properties 
name : horizontal
datatype : boolean
version : 4.0 onwards
default : none 
description : Set true for horizontal checkbox
*/
  @Input() horizontal: boolean;
   /*
Properties 
name : data
datatype : any
version : 4.0 onwards
default : none 
description : 	Local data for radio group.
*/
  @Input() data: any;
/*
Properties 
name : disabled
datatype : boolean
version : 4.0 onwards
default : none 
description : true to disable the field.
*/
  @Input() disabled: any;
/*
Events
name : onBonSelectionlur
datatype : any
version : 4.0 onwards
default : none
description : Fires selection event
*/ 
  @Output() onSelection: any = new EventEmitter<any>();
  /*
Events
name : input
datatype : any
version : none
default : none
description : 	On input event field.
*/
@Output() input: any = new EventEmitter<any>();

  viewData: any;

  responseData: any;

  isComponentValid : boolean;

  constructor(public amxHttp: CommonDataService) {
  }


  onInput(input:any) {
  
    // if(this.viewData)
    // this.isComponentValid = true;
    this.input.emit();
  }

  ngOnInit() {
    
    this.isComponentValid = this.allowblank;

    if (this.httpmethod && this.httpurl) {
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe(response => {
        this.responseData = response;
      }, error => {
      }, () => {
        this.viewData = this.getResponseData(this.responseData);
      });
    } else if (this.data != null) {
      this.viewData = this.getResponseData(this.data);
    }
    
     if (!this.allowblank) {
      this.checkDefaultValidation();
    }
  }
  
  
   checkDefaultValidation() {
    this.viewData.forEach((opt: any)=>{
      if(opt[this.valuefield] == this.defaultSelectedValue || (opt.hasOwnProperty('selected') && opt.selected)){
        this.isComponentValid = true;
        return;
      }

    });
  }
  

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      let dr = this.datareader.split(".");
      if (dr != null) {
        for (let ir = 0; ir < dr.length; ir++) {
          responsedata = responsedata[dr[ir]];
        }
      }
    } else {
      responsedata = httpResponse;
    }

    return responsedata;
  }

  onClick(row: any) {
    for (let r = 0; r < this.viewData.length; r++) {
      if (this.viewData[r] == row) {
        this.viewData[r]['selected'] = true;
        this.isComponentValid = true;
      } else {
        this.viewData[r]['selected'] = false;
      }
    }
    this.onSelection.emit(row);
  }


}

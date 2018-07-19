/**
 * Created by pratik on 27/11/17.
 * Update Ketan Gote on 11/2/2018 - Field Label and Data Rendering changes.
 */
/*
 Component Name : Amexio Radiogroup
 Component Selector :  <amexio-radio-group>
 Component Description : Number input component has been created with different
 configurable attributes for validation (min/max value, allow blank, custom regex),
 custom error message, help, custom styles
*/
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonDataService } from '../../services/data/common.data.service';

@Component({
  selector: 'amexio-radio-group', templateUrl: './radiogroup.component.html', styleUrls: ['./radiogroup.component.scss'],
})
export class AmexioRadioGroupComponent implements OnInit {
  /*
Properties
name : allow-blank
datatype : string
version : 4.0 onwards
default :
description : Sets if field is required
*/
  @Input('allow-blank') allowblank = true;
  /*
Properties
name :name
datatype : boolean
version : 4.0 onwards
default : false
description :
*/
  @Input() name: boolean;

  /*
Properties
name : field-label
datatype : string
version : 4.0 onwards
default :
description : The label of this field
*/
  @Input('field-label') fieldlabel: string;
  /*
Properties
name : data-reader
datatype : string
version : 4.0 onwards
default :
description : 	Key in JSON datasource for records
*/
  @Input('data-reader') datareader: string;
  /*
Properties
name : http-method
datatype : string
version : 4.0 onwards
default :
description : Type of HTTP call, POST,GET.
*/
  @Input('http-method') httpmethod: string;
  /*
Properties
name : http-url
datatype : string
version : 4.0 onwards
default :
description : 	REST url for fetching datasource.
*/
  @Input('http-url') httpurl: string;
  /*
Properties
name : display-field
datatype : string
version : 4.0 onwards
default :
description : Name of key inside response data to display on ui.
*/
  @Input('display-field') displayfield: string;
  /*
Properties
name : value-field
datatype : string
version : 4.0 onwards
default :
description : Name of key inside response data.use to send to backend
*/
  @Input('value-field') valuefield: string;
  /*
Properties
name : default-value
datatype : string
version : 4.0 onwards
default :
description : Default Value to be checked
*/
  @Input('default-value') defaultSelectedValue: string;
  /*
Properties
name : horizontal
datatype : boolean
version : 4.0 onwards
default : false
description : Set true for horizontal checkbox
*/
  @Input() horizontal: boolean;
  /*
Properties
name : data
datatype : any
version : 4.0 onwards
default :
description : 	Local data for radio group.
*/
  @Input() data: any;
  /*
  Properties
  name : disabled
  datatype : boolean
  version : 4.0 onwards
  default : false
  description : true to disable the field.
  */
  @Input() disabled: any;
  /*
  Events
  name : onBonSelectionlur
  datatype : any
  version : 4.0 onwards
  default :
  description : Fires selection event
  */
  @Output() onSelection: any = new EventEmitter<any>();
  /*
Events
name : input
datatype : any
version : none
default :
description : 	On input event field.
*/
  @Output() input: any = new EventEmitter<any>();

  viewData: any;

  responseData: any;

  isValid: boolean;

  @Output() isComponentValid: any = new EventEmitter<any>();

  constructor(public amxHttp: CommonDataService) {
  }

  onInput(input: any) {

    this.isValid = true;
    this.input.emit();
  }

  ngOnInit() {

    this.isValid = this.allowblank;
    this.isComponentValid.emit(this.allowblank);

    if (this.httpmethod && this.httpurl) {
      this.amxHttp.fetchData(this.httpurl, this.httpmethod).subscribe((response) => {
        this.responseData = response;
      }, (error) => {
      }, () => {
        this.viewData = this.getResponseData(this.responseData);
      });
    } else if (this.data != null) {
      this.viewData = this.getResponseData(this.data);
    }
  }

  checkDefaultValidation(viewData: any) {
    viewData.forEach((opt: any) => {
      if (opt[this.valuefield] === this.defaultSelectedValue || (opt.hasOwnProperty('selected') && opt.selected)) {
        this.isValid = true;
        this.isComponentValid.emit(true);
        return;
      }

    });
  }

  getResponseData(httpResponse: any) {
    let responsedata = httpResponse;
    if (this.datareader != null) {
      const dr = this.datareader.split('.');
      if (dr != null) {
        for (const ir of dr) {
          responsedata = responsedata[ir];
        }
      }
    } else {
      responsedata = httpResponse;
    }
    if (!this.allowblank) {
      this.checkDefaultValidation(responsedata);
    }

    return responsedata;
  }

  onClick(row: any) {
    for (const r of this.viewData) {
      if (r === row) {
        [r]['selected'] = true;
        this.isValid = true;
        this.isComponentValid.emit(true);
      } else {
        [r]['selected'] = false;
      }
    }
    this.onSelection.emit(row);
  }

  // THIS MEHTOD CHECK INPUT IS VALID OR NOT
  checkValidity(): boolean {
    return this.isValid;
  }

}
